import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UserIcon, MailIcon } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import type { ScheduleSchema } from "../Schedule"

interface ScheduleFormProps {
    form: UseFormReturn<ScheduleSchema>;
    onSubmit: (data: ScheduleSchema) => void;
}

export function ScheduleForm({ form, onSubmit }: ScheduleFormProps) {
    return (
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
                </form>
            </Form>
        </div>
    )
}