import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarRangeIcon, EyeIcon, EyeOffIcon, KeyIcon, MailIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const formSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});

type RegisterSchema = z.infer<typeof formSchema>;

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    async function onSubmit(data: RegisterSchema) {
        setIsLoading(true);
        try {
            console.log(data);
            // Aqui você implementará a lógica de registro
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
                            Crie sua conta
                        </CardTitle>
                        <CardDescription className="text-center">
                            Agendamentos fáceis começam aqui
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    className="peer ps-9"
                                                    type="text"
                                                    placeholder="Seu nome completo"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                                    <UserIcon size={16} aria-hidden="true" />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                                    <KeyIcon size={16} aria-hidden="true" />
                                                </div>
                                                <Input
                                                    className="pe-9 ps-9"
                                                    placeholder="Sua senha"
                                                    type={isVisible ? "text" : "password"}
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                                <button
                                                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="button"
                                                    onClick={toggleVisibility}
                                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                                    aria-pressed={isVisible}
                                                    aria-controls="password"
                                                >
                                                    {isVisible ? (
                                                        <EyeOffIcon size={16} aria-hidden="true" />
                                                    ) : (
                                                        <EyeIcon size={16} aria-hidden="true" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? "Criando conta..." : "Começar agora"}
                            </Button>
                            <div className="text-center text-sm">
                                Já tem conta?{" "}
                                <Button variant="link" className="px-0 h-auto font-normal" asChild>
                                    <Link to="/login">
                                        Entrar
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
