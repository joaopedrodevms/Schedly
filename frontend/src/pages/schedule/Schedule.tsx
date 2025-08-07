import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import { setHours, setMinutes, setSeconds, setMilliseconds, format } from "date-fns"
import DateTimeScheduler from "@/components/DateTimeScheduler"
import { Button } from "@/components/ui/button"
import { Link, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createSchedulingMutation, getEventPublicOptions } from "@/service/@tanstack/react-query.gen"
import { ArrowRightIcon, CheckIcon } from "lucide-react"
import { SCHEDULE_STEPS } from "./constants"
import { ScheduleHeader } from "./components/ScheduleHeader"
import { ScheduleUserInfo } from "./components/ScheduleUserInfo"
import { ScheduleForm } from "./components/ScheduleForm"
import { ScheduleSuccess } from "./components/ScheduleSuccess"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loading } from "../loading/Loading"

export const scheduleFormSchema = z.object({
    scheduledAt: z.date()
        .min(new Date(), "Não é possível agendar no passado"),
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.email("Email inválido"),
    message: z.string().optional(),
})

export type ScheduleSchema = z.infer<typeof scheduleFormSchema>

export default function Schedule() {
    const { user_slug, event_slug } = useParams();
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    const { data: eventData, isLoading, isError } = useQuery({
        ...getEventPublicOptions({
            path: {
                event_slug: event_slug ?? "",
                user_slug: user_slug ?? "",
            }
        }),
        enabled: !!user_slug && !!event_slug,
        retry: false
    })

    const form = useForm<ScheduleSchema>({
        resolver: zodResolver(scheduleFormSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
            scheduledAt: new Date(),
        }
    })

    const createSchedule = useMutation({
        ...createSchedulingMutation()
    })

    async function onSubmit(data: ScheduleSchema) {
        createSchedule.mutate({
            body: {
                event_id: eventData?.id ?? "",
                quest_name: data.name,
                quest_email: data.email,
                quest_message: data.message ?? "",
                starts_at: format(data.scheduledAt, "yyyy-MM-dd'T'HH:mm"),
            }
        }, {
            onSuccess: () => {
                setCurrentStep(3)
            },
            onError: () => {
                toast.error("Erro ao criar agendamento")
            }
        });
    }

    const handleNext = async () => {
        if (currentStep === 1) {
            if (!selectedDate || !selectedTime) {
                return
            }
        }

        if (currentStep === 2) {
            const result = await form.trigger()
            if (result) {
                form.handleSubmit(onSubmit)()
            }
            return
        }

        if (currentStep < SCHEDULE_STEPS.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    if (!user_slug || !event_slug) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p className="text-destructive">Link inválido. Verifique se o link está correto.</p>
                    <Button className="mt-4" variant="outline">
                        <Link to="/">Voltar ao Início</Link>
                    </Button>
                </div>
            </div>
        )
    }

    if (isLoading) return <Loading />

    if (isError || !eventData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p className="text-destructive">Erro ao carregar evento. Verifique se o link está correto.</p>
                    <Button className="mt-4" variant="outline">
                        <Link to="/">Voltar ao Início</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <ScrollArea className="h-screen">
            <div className="flex items-center justify-center p-4 lg:h-screen h-full">
                <div className="w-full lg:max-w-[1000px] flex flex-col gap-2">
                    <Card>
                        <ScheduleHeader
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                            steps={SCHEDULE_STEPS}
                        />
                        <CardContent className="p-6">
                            {currentStep !== 3 ? (
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <ScheduleUserInfo
                                        eventData={eventData}
                                        selectedDate={selectedDate}
                                        selectedTime={selectedTime}
                                        currentStep={currentStep}
                                    />
                                    <div className="pt-6 md:pt-0 md:pl-6 w-full">
                                        {currentStep === 1 && (
                                            <DateTimeScheduler
                                                avails={eventData?.avails ?? []}
                                                notAvailable={eventData?.not_available ?? []}
                                                durationMinutes={eventData?.duration_minutes ?? 0}
                                                onSelect={(date, time) => {
                                                    setSelectedDate(date)
                                                    setSelectedTime(time)

                                                    const [hours, minutes] = time.split(':').map(Number)
                                                    const scheduledAt = setMilliseconds(
                                                        setSeconds(
                                                            setMinutes(
                                                                setHours(date, hours),
                                                                minutes
                                                            ),
                                                            0
                                                        ),
                                                        0
                                                    )

                                                    form.setValue('scheduledAt', scheduledAt)
                                                }}
                                            />
                                        )}
                                        {currentStep === 2 && (
                                            <ScheduleForm
                                                form={form}
                                                onSubmit={onSubmit}
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <ScheduleSuccess
                                    selectedTime={selectedTime}
                                    selectedDate={selectedDate}
                                />
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between p-6 pt-0">
                            {currentStep === 2 && (
                                <Button
                                    variant="outline"
                                    onClick={handlePrevious}
                                    type="button"
                                >
                                    Voltar
                                </Button>
                            )}
                            {currentStep !== 3 && (
                                <Button
                                    onClick={handleNext}
                                    className="ml-auto"
                                    type={currentStep === 2 ? "submit" : "button"}
                                >
                                    {currentStep === 1 && (
                                        <div className="flex items-center gap-2">
                                            Continuar
                                            <ArrowRightIcon />
                                        </div>
                                    )}
                                    {currentStep === 2 && (
                                        <div className="flex items-center gap-2">
                                            Agendar
                                            <CheckIcon />
                                        </div>
                                    )}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </ScrollArea>
    )
}