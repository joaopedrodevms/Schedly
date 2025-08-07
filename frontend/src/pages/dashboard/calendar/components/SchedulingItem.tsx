import { cn } from "@/lib/utils";
import type { SchedulingDto } from "@/service";
import { format, getMinutes, isPast } from "date-fns";
import { MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";

interface SchedulingItemProps {
    scheduling: SchedulingDto;
}

export default function SchedulingItem({ scheduling }: SchedulingItemProps) {
    const isPastEvent = isPast(new Date(scheduling.ends_at));

    return (
        <div
            className={cn(
                "focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-col gap-2 rounded-lg p-3 text-left transition outline-none focus-visible:ring-[3px]",
                "bg-violet-200/50 hover:bg-violet-200/40 text-violet-950/80 dark:bg-violet-400/25 dark:hover:bg-violet-400/20 dark:text-violet-200 shadow-sm",
                isPastEvent && "opacity-70"
            )}
            data-past-event={isPastEvent || undefined}
        >
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-sm font-medium line-clamp-1">{scheduling.event.title}</div>
                    <div className="text-xs opacity-70 mt-0.5">
                        <span className="uppercase">
                            {format(scheduling.starts_at, getMinutes(scheduling.starts_at) === 0 ? "ha" : "h:mma").toLowerCase()} -{" "}
                            {format(scheduling.ends_at, getMinutes(scheduling.ends_at) === 0 ? "ha" : "h:mma").toLowerCase()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1 w-fit">
                    <UserIcon className="size-3" />
                    <span className="text-xs font-medium">{scheduling.quest_name}</span>
                </div>
                <div className="flex items-center gap-1 w-fit">
                    <MailIcon className="size-3" />
                    <span className="text-xs font-medium">{scheduling.quest_email}</span>
                </div>

                {scheduling.quest_message && (
                    <div className="bg-black/5 dark:bg-white/5 p-2 rounded-md mt-1">
                        <div className="flex items-center gap-1 w-fit">
                            <MessageCircleIcon className="size-3" />
                            <span className="text-xs opacity-90">{scheduling.quest_message}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="text-[10px] opacity-50 mt-1">
                Criado em: {format(new Date(scheduling.created_at), "dd/MM/yyyy HH:mm")}
                {scheduling.updated_at && ` • Atualizado em: ${format(new Date(scheduling.updated_at), "dd/MM/yyyy HH:mm")}`}
            </div>
        </div>
    );
}