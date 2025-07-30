import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DateInput, TimeField } from "@/components/ui/datefield-rac";
import { PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import type { WeekAvailability } from "./types";
import { DEFAULT_WEEK_AVAILABILITY, WeekDay, WEEK_DAYS } from "./types";
import { Time } from "@internationalized/date";

export function Availabilities() {
    const [availabilities, setAvailabilities] = useState<WeekAvailability>(DEFAULT_WEEK_AVAILABILITY);
    const [nextId, setNextId] = useState(1);

    const addTimeRange = (day: WeekDay) => {
        setAvailabilities(prev => ({
            ...prev,
            [day]: {
                ranges: [
                    ...prev[day].ranges,
                    { id: nextId.toString(), start: "09:00", end: "17:00" }
                ]
            }
        }));
        setNextId(prev => prev + 1);
    };

    const removeTimeRange = (day: WeekDay, rangeId: string) => {
        setAvailabilities(prev => ({
            ...prev,
            [day]: {
                ranges: prev[day].ranges.filter(range => range.id !== rangeId)
            }
        }));
    };

    const updateTimeRange = (day: WeekDay, rangeId: string, field: "start" | "end", value: Time | null) => {
        if (!value) return;
        
        setAvailabilities(prev => ({
            ...prev,
            [day]: {
                ranges: prev[day].ranges.map(range =>
                    range.id === rangeId ? { ...range, [field]: value.toString() } : range
                )
            }
        }));
    };

    const parseTimeString = (time: string): Time => {
        const [hours, minutes] = time.split(":").map(Number);
        return new Time(hours, minutes);
    };

    return (
        <div className="flex flex-col gap-2">
            {WEEK_DAYS.map(day => (
                <div key={day} className="flex flex-row gap-2 items-start justify-start">
                    <Badge className="h-fit w-10 mt-1.5">{day}</Badge>
                    {availabilities[day].ranges.length === 0 ? (
                        <div className="flex flex-row gap-2 items-center">
                            <p className="text-muted-foreground px-[13px]">Indisponível</p>
                            <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => addTimeRange(day)}
                            >
                                <PlusIcon />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {availabilities[day].ranges.map((range, index) => (
                                <div key={range.id} className="flex flex-row gap-2">
                                    <TimeField 
                                        className="*:not-first:mt-2 w-fit" 
                                        aria-label="Start Time"
                                        value={parseTimeString(range.start)}
                                        onChange={(value) => updateTimeRange(day, range.id, "start", value)}
                                    >
                                        <div className="relative">
                                            <DateInput className="bg-card w-[68px]" />
                                        </div>
                                    </TimeField>
                                    <TimeField 
                                        className="*:not-first:mt-2 w-fit" 
                                        aria-label="End Time"
                                        value={parseTimeString(range.end)}
                                        onChange={(value) => updateTimeRange(day, range.id, "end", value)}
                                    >
                                        <div className="relative">
                                            <DateInput className="bg-card w-[68px]" />
                                        </div>
                                    </TimeField>
                                    <Button 
                                        variant="outline" 
                                        size="icon"
                                        onClick={() => removeTimeRange(day, range.id)}
                                    >
                                        <XIcon />
                                    </Button>
                                    {index === availabilities[day].ranges.length - 1 && (
                                        <Button 
                                            variant="outline" 
                                            size="icon"
                                            onClick={() => addTimeRange(day)}
                                        >
                                            <PlusIcon />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}