import type { SchedulingDto } from "@/service"
import { RiCalendarEventLine } from "@remixicon/react";
import { addDays, format, isSameDay, isToday } from "date-fns";
import { useMemo } from "react";
import SchedulingItem from "./SchedulingItem";

const AgendaDaysToShow = 30

interface AgendaViewProps {
    currentDate: Date
    schedulings: SchedulingDto[]
}

export function getAgendaSchedulingForDay(
    schedulings: SchedulingDto[],
    day: Date
): SchedulingDto[] {
    return schedulings
        .filter((scheduling) => {
            const schedulingStart = new Date(scheduling.starts_at)
            const schedulingEnd = new Date(scheduling.ends_at)
            return (
                isSameDay(day, schedulingStart) ||
                isSameDay(day, schedulingEnd) ||
                (day > schedulingStart && day < schedulingEnd)
            )
        })
        .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.ends_at).getTime())
}
export default function AgendaView({ currentDate, schedulings }: AgendaViewProps) {

    const days = useMemo(() => {
        return Array.from({ length: AgendaDaysToShow }, (_, i) =>
            addDays(new Date(currentDate), i)
        )
    }, [currentDate])

    const hasSchedulings = days.some(
        (day) => getAgendaSchedulingForDay(schedulings, day).length > 0
    )

    return (
        <div className="border-border/70 px-4">
            {!hasSchedulings ? (
                <div className="flex min-h-[70svh] flex-col items-center justify-center py-16 text-center">
                    <RiCalendarEventLine
                        size={32}
                        className="text-muted-foreground/50 mb-2"
                    />
                    <h3 className="text-lg font-medium">Nenhum agendamento encontrado</h3>
                    <p className="text-muted-foreground">
                        Não há agendamentos.
                    </p>
                </div>
            ) : (
                days.map((day) => {
                    const dayScheduling = getAgendaSchedulingForDay(schedulings, day)

                    if (dayScheduling.length === 0) return null

                    return (
                        <div
                            key={day.toString()}
                            className="border-border/70 relative my-12 border-t"
                        >
                            <span
                                className="bg-background absolute -top-3 left-0 flex h-6 items-center pe-4 text-[10px] uppercase data-today:font-medium sm:pe-4 sm:text-xs"
                                data-today={isToday(day) || undefined}
                            >
                                {format(day, "d MMM, EEEE")}
                            </span>
                            <div className="mt-6 space-y-2">
                                {dayScheduling.map((scheduling) => (
                                    <SchedulingItem key={scheduling.id} scheduling={scheduling} />
                                ))}
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}