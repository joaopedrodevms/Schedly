import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarRangeIcon, EyeIcon, EyeOffIcon, KeyIcon, LinkIcon, MailIcon, UserIcon, CheckIcon, XIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerMutation, validateSlugOptions } from "@/service/@tanstack/react-query.gen";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    slug: z.string().min(3, "O slug deve ter no mínimo 3 caracteres")
});

type RegisterSchema = z.infer<typeof formSchema>;

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [slugValue, setSlugValue] = useState<string>("");
    const debouncedSlug = useDebounce(slugValue, 500);

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            slug: "",
        }
    });

    const validateSlug = useQuery({
        ...validateSlugOptions({
            query: {
                slug: debouncedSlug
            }
        }),
        enabled: debouncedSlug.length >= 3,
    });

    const register = useMutation({
        ...registerMutation(),
        onSuccess: (data) => {
            toast.success("Conta criada com sucesso!");
            login(data.access_token, data.user);
            navigate("/dashboard/calendar");
        },
        onError: (error) => {
            const errorMessage = error instanceof Error ? error.message : "Erro ao criar conta.";
            toast.error(errorMessage);
        }
    });

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "slug") {
                setSlugValue(value.slug || "");
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    async function onSubmit(data: RegisterSchema) {
        setIsLoading(true);
        try {
            if (!validateSlug.data?.is_valid) {
                form.setError("slug", {
                    type: "manual",
                    message: "Este slug já está em uso"
                });
                return;
            }
            await register.mutateAsync({
                body: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    slug: data.slug
                }
            });
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
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                                    <LinkIcon size={16} aria-hidden="true" />
                                                </div>
                                                <Input
                                                    className="pe-9 ps-9"
                                                    placeholder="seu-slug"
                                                    disabled={isLoading}
                                                    {...field}
                                                />
                                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                                    {validateSlug.isLoading ? (
                                                        <div className="size-4 border-2 border-foreground/20 border-t-foreground/80 rounded-full animate-spin" />
                                                    ) : validateSlug.data?.is_valid ? (
                                                        <CheckIcon size={16} className="text-green-500" aria-hidden="true" />
                                                    ) : validateSlug.data?.is_valid === false ? (
                                                        <XIcon size={16} className="text-red-500" aria-hidden="true" />
                                                    ) : (
                                                        <LinkIcon size={16} aria-hidden="true" />
                                                    )}
                                                </div>
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
