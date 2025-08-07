import { useQuery } from "@tanstack/react-query"
import { getSchedulingOptions } from "@/service/@tanstack/react-query.gen"
import { useState } from "react"
import AgendaView from "./components/AgendaView"

export default function Calendar() {

    const [currentDate] = useState(new Date())

    const { data: schedulings } = useQuery({
        ...getSchedulingOptions()
    })

    return (
        <AgendaView
            currentDate={currentDate}
            schedulings={schedulings ?? []}
        />
    )
}
