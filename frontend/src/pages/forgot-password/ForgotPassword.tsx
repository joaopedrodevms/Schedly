import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarRangeIcon, MailIcon } from "lucide-react";
import { Link } from "react-router-dom";

const formSchema = z.object({
    email: z.string().email("E-mail inválido"),
});

type ForgotPasswordSchema = z.infer<typeof formSchema>;

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    });

    async function onSubmit(data: ForgotPasswordSchema) {
        setIsLoading(true);
        try {
            console.log(data);
            // Aqui você implementará a lógica de envio do código
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-6">
                    <Link to="/" className="w-full flex justify-center">
                        <div className="flex items-center gap-2 py-2 px-4">
                            <div className="p-1 border rounded-md bg-foreground flex items-center justify-center">
                                <CalendarRangeIcon className="size-6 text-muted" />
                            </div>
                            <span className="font-semibold">Schedly</span>
                        </div>
                    </Link>
                    <div className="space-y-1.5">
                        <CardTitle className="text-2xl text-center">
                            Esqueceu sua senha?
                        </CardTitle>
                        <CardDescription className="text-center">
                            Digite o e-mail associado à sua conta. Enviaremos um código de verificação para redefinir sua senha com segurança.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    className="peer ps-9"
                                                    type="email"
                                                    placeholder="seu@email.com"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                                    <MailIcon size={16} aria-hidden="true" />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-2">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Enviando..." : "Enviar código"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    asChild
                                >
                                    <Link to="/login">
                                        Voltar para login
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
