import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import {
    Stepper,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRightIcon, CalendarCheck, CheckCircleIcon, CheckIcon, Clock, MailIcon, UserIcon } from "lucide-react"
import { useState } from "react"
import DateTimeScheduler from "@/components/DateTimeScheduler"
import { Button } from "@/components/ui/button"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import SelectTimezone from "@/components/SelectTimezone"
import { Textarea } from "@/components/ui/textarea"

const steps = [
    {
        step: 1,
        title: "Escolha um horário",
    },
    {
        step: 2,
        title: "Seus dados",
    },
    {
        step: 3,
        title: "Confirmado",
    },
]

const formSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    message: z.string().optional(),
})

type ScheduleShema = z.infer<typeof formSchema>

export default function Schedule() {
    const [currentStep, setCurrentStep] = useState(1)
    const form = useForm<ScheduleShema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        }
    })

    async function onSubmit(data: ScheduleShema) {
        console.log(data)
        setCurrentStep(3)
    }

    const handleNext = async () => {
        if (currentStep === 2) {
            // Trigger form validation and submission
            const result = await form.trigger()
            if (result) {
                form.handleSubmit(onSubmit)()
            }
            return
        }

        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="flex items-center justify-center p-6 h-screen">
            <div className="w-full lg:max-w-[1000px] flex flex-col gap-2">
                <Card className="">
                    <CardHeader>
                        <Stepper value={currentStep} onValueChange={setCurrentStep}>
                            {steps.map(({ step, title }) => (
                                <StepperItem
                                    key={step}
                                    step={step}
                                    className="relative flex-1 flex-col!"
                                    disabled={currentStep === 3}
                                >
                                    <StepperTrigger className="flex-col gap-3 rounded">
                                        <StepperIndicator />
                                        <div className="space-y-0.5 px-2">
                                            <StepperTitle>{title}</StepperTitle>
                                        </div>
                                    </StepperTrigger>
                                    {step < steps.length && (
                                        <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                                    )}
                                </StepperItem>
                            ))}
                        </Stepper>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        {currentStep !== 3 ? (
                            <>
                                <div className="flex flex-col items-center gap-2">
                                    <Avatar className="h-36 w-36">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="text-center">
                                        <div className="space-y-2">
                                            <p className="text-lg text-muted-foreground">João Silva</p>
                                            <h2 className="text-2xl font-bold">Reunião de Confirmação</h2>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Clock className="h-4 w-4" />
                                            <span>30 Minutos</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-l-0 md:border-l pt-6 md:pt-0 md:pl-6 border-t md:border-t-0">
                                    {currentStep === 1 && <DateTimeScheduler />}
                                    {currentStep === 2 &&
                                        <div className="h-full flex flex-col justify-center">
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                                    <FormField control={form.control} name="name" render={({ field }) => (
                                                        <FormItem className="">
                                                            <FormLabel>Nome</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Input
                                                                        className="peer ps-9"
                                                                        type="text"
                                                                        placeholder="João Silva"
                                                                        {...field}
                                                                    />
                                                                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                                                        <UserIcon size={16} aria-hidden="true" />
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                    <FormField control={form.control} name="email" render={({ field }) => (
                                                        <FormItem className="">
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Input
                                                                        className="peer ps-9"
                                                                        type="email"
                                                                        placeholder="seuemail@exemplo.com"
                                                                        {...field}
                                                                    />
                                                                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                                                        <MailIcon size={16} aria-hidden="true" />
                                                                    </div>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                    <FormField control={form.control} name="message" render={({ field }) => (
                                                        <FormItem className="">
                                                            <FormLabel>Mensagem (Opcional)</FormLabel>
                                                            <FormControl>
                                                                <Textarea placeholder="Ex: Gostaria de agendar uma reunião para discutir o projeto" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                    <SelectTimezone />
                                                </form>
                                            </Form>
                                        </div>}
                                </div>
                            </>
                        ) : (
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
                                            <span>13:00 - 13:30, Quarta, 23 de Julho de 2025</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-4">
                                        Um email de confirmação foi enviado para seu endereço de email.
                                    </p>
                                    <Button>
                                        <Link to="/">Inicio</Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between p-6 pt-0">
                        {currentStep === 2 && <Button
                            variant="outline"
                            onClick={handlePrevious}
                            type="button"
                        >
                            Voltar
                        </Button>}
                        {currentStep !== 3 && <Button
                            onClick={handleNext}
                            className="ml-auto"
                            type={currentStep === 2 ? "submit" : "button"}
                        >
                            {currentStep == 1 && (
                                <div className="flex items-center gap-2">Continuar
                                    <ArrowRightIcon />
                                </div>
                            )}
                            {currentStep == 2 && (
                                <div className="flex items-center gap-2">Agendar
                                    <CheckIcon />
                                </div>
                            )}
                        </Button>}
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
