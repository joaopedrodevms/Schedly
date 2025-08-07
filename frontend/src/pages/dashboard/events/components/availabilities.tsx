import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DateInput, TimeField } from "@/components/ui/datefield-rac";
import { PlusIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Time } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAvailsMutation, getAvailsOptions } from "@/service/@tanstack/react-query.gen";
import type { Availability } from "@/service/types.gen";
import { WEEK_DAYS, WEEK_DAY_LABELS, type WeekDay } from "./types";
import { toast } from "sonner";

interface AvailabilitiesProps {
    eventId: string;
}

interface TimeRange {
    id: string;
    start: string;
    end: string;
}

interface DayAvailability {
    weekDay: WeekDay;
    ranges: TimeRange[];
}

export function Availabilities({ eventId }: AvailabilitiesProps) {
    const [availabilities, setAvailabilities] = useState<DayAvailability[]>(
        WEEK_DAYS.map(day => ({ weekDay: day, ranges: [] }))
    );
    const [originalAvailabilities, setOriginalAvailabilities] = useState<DayAvailability[]>([]);
    const [nextId, setNextId] = useState(1);
    const [hasChanges, setHasChanges] = useState(false);

    const { data: avails } = useQuery({
        ...getAvailsOptions({
            query: {
                event_id: eventId
            }
        })
    });

    const createAvails = useMutation({
        ...createAvailsMutation(),
        onSuccess: () => {
            toast.success("Disponibilidades atualizadas com sucesso!");
            setHasChanges(false);
        },
        onError: () => {
            toast.error("Erro ao atualizar disponibilidades.");
        }
    });

    // Função para converter as disponibilidades do backend para o formato local
    const convertBackendToLocal = (backendAvails: typeof avails): DayAvailability[] => {
        return WEEK_DAYS.map(day => ({
            weekDay: day,
            ranges: backendAvails?.availability
                .filter(a => a.week_day === day)
                .map((a, idx) => ({
                    id: idx.toString(),
                    start: a.start_time,
                    end: a.end_time
                })) || []
        }));
    };

    useEffect(() => {
        if (avails) {
            const groupedAvails = convertBackendToLocal(avails);
            setAvailabilities(groupedAvails);
            setOriginalAvailabilities(groupedAvails);

            // Encontrar o maior ID atual e adicionar 1 para o próximo
            const maxId = Math.max(
                ...groupedAvails.flatMap(d => 
                    d.ranges.map(r => parseInt(r.id, 10))
                ).concat([0])
            );
            setNextId(maxId + 1);
        }
    }, [avails]);

    // Função para comparar as disponibilidades atuais com as originais
    const checkForChanges = (newAvailabilities: DayAvailability[]) => {
        const simplifyAvails = (avails: DayAvailability[]) => 
            avails.map(day => ({
                weekDay: day.weekDay,
                ranges: day.ranges.map(({ start, end }) => ({ start, end }))
            }));

        const currentSimple = JSON.stringify(simplifyAvails(newAvailabilities));
        const originalSimple = JSON.stringify(simplifyAvails(originalAvailabilities));

        setHasChanges(currentSimple !== originalSimple);
    };

    const addTimeRange = (weekDay: WeekDay) => {
        const newAvailabilities = availabilities.map(day => 
            day.weekDay === weekDay
                ? {
                    ...day,
                    ranges: [
                        ...day.ranges,
                        { id: nextId.toString(), start: "09:00", end: "17:00" }
                    ]
                }
                : day
        );
        setAvailabilities(newAvailabilities);
        setNextId(prev => prev + 1);
        checkForChanges(newAvailabilities);
    };

    const removeTimeRange = (weekDay: WeekDay, rangeId: string) => {
        const newAvailabilities = availabilities.map(day =>
            day.weekDay === weekDay
                ? {
                    ...day,
                    ranges: day.ranges.filter(range => range.id !== rangeId)
                }
                : day
        );
        setAvailabilities(newAvailabilities);
        checkForChanges(newAvailabilities);
    };

    const updateTimeRange = (weekDay: WeekDay, rangeId: string, field: "start" | "end", value: Time | null) => {
        if (!value) return;
        
        const newAvailabilities = availabilities.map(day =>
            day.weekDay === weekDay
                ? {
                    ...day,
                    ranges: day.ranges.map(range =>
                        range.id === rangeId
                            ? { ...range, [field]: value.toString() }
                            : range
                    )
                }
                : day
        );
        setAvailabilities(newAvailabilities);
        checkForChanges(newAvailabilities);
    };

    const handleSave = () => {
        const availability: Availability[] = availabilities.flatMap(day =>
            day.ranges.map(range => ({
                week_day: day.weekDay,
                start_time: range.start,
                end_time: range.end
            }))
        );

        createAvails.mutate({
            body: {
                event_id: eventId,
                availability
            }
        });
    };

    const parseTimeString = (time: string): Time => {
        const [hours, minutes] = time.split(":").map(Number);
        return new Time(hours, minutes);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                {availabilities.map(day => (
                    <div key={day.weekDay} className="flex flex-row gap-2 items-start justify-start">
                        <Badge className="h-fit w-14 mt-1.5">{WEEK_DAY_LABELS[day.weekDay]}</Badge>
                        {day.ranges.length === 0 ? (
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-muted-foreground px-[13px]">Indisponível</p>
                                <Button 
                                    variant="outline" 
                                    size="icon"
                                    onClick={() => addTimeRange(day.weekDay)}
                                >
                                    <PlusIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {day.ranges.map((range, index) => (
                                    <div key={range.id} className="flex flex-row gap-2">
                                        <TimeField 
                                            className="*:not-first:mt-2 w-fit" 
                                            aria-label="Start Time"
                                            value={parseTimeString(range.start)}
                                            onChange={(value) => updateTimeRange(day.weekDay, range.id, "start", value)}
                                        >
                                            <div className="relative">
                                                <DateInput className="bg-card w-[68px]" />
                                            </div>
                                        </TimeField>
                                        <TimeField 
                                            className="*:not-first:mt-2 w-fit" 
                                            aria-label="End Time"
                                            value={parseTimeString(range.end)}
                                            onChange={(value) => updateTimeRange(day.weekDay, range.id, "end", value)}
                                        >
                                            <div className="relative">
                                                <DateInput className="bg-card w-[68px]" />
                                            </div>
                                        </TimeField>
                                        <Button 
                                            variant="outline" 
                                            size="icon"
                                            onClick={() => removeTimeRange(day.weekDay, range.id)}
                                        >
                                            <XIcon className="h-4 w-4" />
                                        </Button>
                                        {index === day.ranges.length - 1 && (
                                            <Button 
                                                variant="outline" 
                                                size="icon"
                                                onClick={() => addTimeRange(day.weekDay)}
                                            >
                                                <PlusIcon className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {hasChanges && (
                <Button 
                    className="w-full"
                    onClick={handleSave}
                    disabled={createAvails.isPending}
                >
                    {createAvails.isPending ? "Salvando..." : "Salvar Disponibilidades"}
                </Button>
            )}
        </div>
    );
}