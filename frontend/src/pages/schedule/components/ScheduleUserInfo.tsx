import { Clock, MapPinIcon, MessageCircleIcon, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import type { EventWithAvailabilityDto } from "@/service";

interface ScheduleUserInfoProps {
    eventData: EventWithAvailabilityDto;
    selectedDate: Date | null;
    selectedTime: string | null;
    currentStep: number;
}

export function ScheduleUserInfo({ eventData, selectedDate, selectedTime, currentStep }: ScheduleUserInfoProps) {
    return (
        <div className="flex flex-row w-full">
            <div className="flex flex-col w-full">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-32">
                        <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden group rounded-md">
                            <img
                                className="size-full object-cover"
                                src={eventData?.user?.cover_url}
                                alt="Default profile background"
                                width={512}
                                height={96}
                            />
                        </div>
                    </div>
                </div>
                <div className="-mt-16 m-auto px-6 flex flex-col items-center">
                    <div className="border-background bg-muted relative flex size-32 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10 group">
                        <img
                            src={eventData?.user?.avatar_url}
                            className="size-full object-cover"
                            alt="Profile image"
                        />
                    </div>
                    <p className="text-lg text-muted-foreground">{eventData?.user?.name}</p>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">{eventData?.title}</h2>
                </div>
                <div className="flex flex-col mt-4">
                    {eventData.description && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageCircleIcon className="h-4 w-4" />
                            <span>{eventData?.description}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{eventData?.duration_minutes} Minutos</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPinIcon className="h-4 w-4" />
                        <span>Presencial</span>
                    </div>
                    {selectedDate && selectedTime && currentStep >= 2 && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                                {selectedTime}, {format(selectedDate!, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}