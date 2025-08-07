import { CalendarPlusIcon } from "lucide-react"
import { CreateEventDialog } from "./create-event-dialog"

interface EmptyEventsProps {
    onSuccess: () => void
}

export function EmptyEvents({ onSuccess }: EmptyEventsProps) {
    return (
        <div className="flex items-center justify-center p-6 h-[calc(100vh-92px)]">
            <div className="w-full lg:max-w-[800px] flex flex-col gap-2">
                <div className="border rounded-md border-border border-dashed flex flex-col gap-10 items-center justify-center text-muted-foreground bg-card p-10">
                    <CalendarPlusIcon className="h-20 w-20" strokeWidth={1} />
                    <div className="flex flex-col gap-2 text-center">
                        <h2 className="text-2xl font-bold tracking-tight">Crie links de agendamento com os tipos de evento</h2>
                        <p className="text-muted-foreground">
                            Crie tipos de eventos para as reuniões que você quiser agendar regularmente, como demonstrações de produtos, chamadas com clientes, horários de atendimento e outras.
                        </p>
                    </div>
                    <CreateEventDialog onSuccess={onSuccess} />
                </div>
            </div>
        </div>
    )
} 