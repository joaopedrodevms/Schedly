import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarRangeIcon, EyeIcon, EyeOffIcon, KeyIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type ResetPasswordSchema = z.infer<typeof formSchema>;

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisibility = () => setIsVisible((prevState) => !prevState)
    const navigate = useNavigate();
    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });

    async function onSubmit(data: ResetPasswordSchema) {
        setIsLoading(true);
        try {
            console.log(data);
            // Aqui você implementará a lógica de redefinição de senha
            // Após sucesso, redirecionar para login
            navigate("/login");
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
                            Crie uma nova senha
                        </CardTitle>
                        <CardDescription className="text-center">
                            Insira uma nova senha para sua conta. Certifique-se de usar uma senha segura.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nova senha</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                                    <KeyIcon size={16} aria-hidden="true" />
                                                </div>
                                                <Input
                                                    className="pe-9 ps-9"
                                                    placeholder="Sua nova senha"
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
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmar nova senha</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                                    <KeyIcon size={16} aria-hidden="true" />
                                                </div>
                                                <Input
                                                    className="pe-9 ps-9"
                                                    placeholder="Confirme sua nova senha"
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
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? "Redefinindo..." : "Redefinir senha"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
