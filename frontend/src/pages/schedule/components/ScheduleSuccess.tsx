import { Button } from "@/components/ui/button"
import { CalendarCheck, CheckCircleIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface ScheduleSuccessProps {
    selectedTime: string | null;
    selectedDate: Date | null;
}

export function ScheduleSuccess({ selectedTime, selectedDate }: ScheduleSuccessProps) {
    return (
        <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                <CheckCircleIcon className="h-12 w-12 text-green-600 dark:text-green-500" />
            </div>
            <div className="mt-6 text-center space-y-3">
                <h2 className="text-2xl font-semibold">Agendamento Confirmado!</h2>
                <div className="space-y-2">
                    <p className="text-muted-foreground">
                        Sua reunião foi agendada com sucesso.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <CalendarCheck className="h-4 w-4" />
                        <span>
                            {selectedTime}, {format(selectedDate!, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </span>
                    </div>
                </div>
                <Button>
                    <Link to="/">Inicio</Link>
                </Button>
            </div>
        </div>
    )
}