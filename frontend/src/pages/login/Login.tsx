import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarRangeIcon, EyeIcon, EyeOffIcon, KeyIcon, MailIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginMutation } from "@/service/@tanstack/react-query.gen";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginSchema = z.infer<typeof formSchema>;

export default function Login() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const authLogin = useMutation({
        ...loginMutation()
    })

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)
    const form = useForm<LoginSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginSchema) {
        authLogin.mutate({
            body: {
                email: data.email,
                password: data.password,
            }
        }, {
            onError: () => {
                toast.error("Email ou senha inválidos")
            },
            onSuccess: (response) => {
                login(response.access_token, response.user);
                navigate("/dashboard/calendar")
                toast.success("Login realizado com sucesso")
            }
        })
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
                            Bem-vindo de volta 👋
                        </CardTitle>
                        <CardDescription className="text-center">
                            Acesse sua conta para gerenciar seus agendamentos
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
                                                    disabled={authLogin.isPending}
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
                                                    disabled={authLogin.isPending}
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
                                        <Button variant="link" className="px-0 h-auto font-normal text-muted-foreground flex justify-start" asChild>
                                            <Link to="/forgot-password" className="text-sm">
                                                Esqueci minha senha
                                            </Link>
                                        </Button>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={authLogin.isPending}
                            >
                                {authLogin.isPending ? "Entrando..." : "Entrar"}
                            </Button>
                            <div className="text-center text-sm">
                                Novo por aqui?{" "}
                                <Button variant="link" className="px-0 h-auto font-normal" asChild>
                                    <Link to="/register">
                                        Criar conta
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
