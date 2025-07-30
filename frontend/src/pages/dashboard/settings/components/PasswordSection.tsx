import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, KeyIcon, LockIcon } from "lucide-react";

const formSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
})

type PasswordShema = z.infer<typeof formSchema>

export default function PasswordSection() {

    const [isLoading, setIsLoading] = useState(false);
    const [isVisibleCurrentPassword, setIsVisibleCurrentPassword] = useState<boolean>(false)
    const [isVisibleNewPassword, setIsVisibleNewPassword] = useState<boolean>(false)

    const toggleVisibilityCurrentPassword = () => setIsVisibleCurrentPassword((prevState) => !prevState)
    const toggleVisibilityNewPassword = () => setIsVisibleNewPassword((prevState) => !prevState)

    const form = useForm<PasswordShema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
        }
    })

    async function onSubmit(data: PasswordShema) {
        setIsLoading(true)
        console.log(data)
        setIsLoading(false)
    }

    return (
        <Card>
            <CardHeader className="border-b">
                <CardTitle>
                    <div className="flex items-center gap-2">
                        <LockIcon />
                        Segurança da Conta
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <FormField control={form.control} name="currentPassword" render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Senha atual</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                            <KeyIcon size={16} aria-hidden="true" />
                                        </div>
                                        <Input
                                            className="pe-9 ps-9"
                                            placeholder="Senha atual"
                                            type={isVisibleCurrentPassword ? "text" : "password"}
                                            disabled={isLoading}
                                            {...form.register('currentPassword')}
                                            {...field}
                                        />
                                        <button
                                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            onClick={toggleVisibilityCurrentPassword}
                                            aria-label={isVisibleCurrentPassword ? "Hide password" : "Show password"}
                                            aria-pressed={isVisibleCurrentPassword}
                                            aria-controls="password"
                                        >
                                            {isVisibleCurrentPassword ? (
                                                <EyeOffIcon size={16} aria-hidden="true" />
                                            ) : (
                                                <EyeIcon size={16} aria-hidden="true" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="newPassword" render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Nova senha</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                            <KeyIcon size={16} aria-hidden="true" />
                                        </div>
                                        <Input
                                            className="pe-9 ps-9"
                                            placeholder="Nova senha"
                                            type={isVisibleNewPassword ? "text" : "password"}
                                            disabled={isLoading}
                                            {...form.register('newPassword')}
                                            {...field}
                                        />
                                        <button
                                            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            onClick={toggleVisibilityNewPassword}
                                            aria-label={isVisibleNewPassword ? "Hide password" : "Show password"}
                                            aria-pressed={isVisibleNewPassword}
                                            aria-controls="password"
                                        >
                                            {isVisibleNewPassword ? (
                                                <EyeOffIcon size={16} aria-hidden="true" />
                                            ) : (
                                                <EyeIcon size={16} aria-hidden="true" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type="submit" className="ml-auto mt-4" size={"sm"} variant={"outline"}>Alterar senha</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}