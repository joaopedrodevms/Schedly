import { useQuery } from "@tanstack/react-query"
import { getEventOptions } from "@/service/@tanstack/react-query.gen"
import { useAuth } from "@/context/AuthContext"
import { CreateEventDialog } from "./components/create-event-dialog"
import { EventAccordion } from "./components/event-accordion"
import { EmptyEvents } from "./components/empty-events"

export default function Events() {
    const { isAuthenticated } = useAuth()

    const events = useQuery({
        ...getEventOptions(),
        enabled: isAuthenticated
    })

    if (events.data?.length === 0) {
        return <EmptyEvents onSuccess={() => events.refetch()}/>
    }

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full lg:max-w-[800px] flex flex-col gap-2">
                <div className="flex justify-end">
                    <CreateEventDialog onSuccess={() => events.refetch()} />
                </div>
                <EventAccordion events={events.data ?? []} onSuccess={() => events.refetch()} />
            </div>
        </div>
    )
}