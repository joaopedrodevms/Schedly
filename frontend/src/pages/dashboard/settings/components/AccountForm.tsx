import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SelectTimezone from "@/components/SelectTimezone";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserOptions, updateUserMutation, validateSlugOptions } from "@/service/@tanstack/react-query.gen";
import { CheckIcon, LinkIcon, MailIcon, SaveIcon, UserIcon, XIcon } from "lucide-react";

const formSchema = z.object({
    name: z.string(),
    email: z.email(),
    slug: z.string().optional(),
    timezone: z.string(),
})

export type AccountSchema = z.infer<typeof formSchema>

export function AccountForm() {
    const [isLoading, setIsLoading] = useState(false);

    const currentUser = useQuery({
        ...getUserOptions(),
        retry: false,
    });

    const updateUser = useMutation({
        ...updateUserMutation()
    })

    const form = useForm<AccountSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: currentUser.data?.name ?? '',
            email: currentUser.data?.email ?? '',
            slug: currentUser.data?.slug ?? '',
            timezone: currentUser.data?.timezone ?? 'America/Sao_Paulo',
        }
    })

    const [debouncedSlug, setDebouncedSlug] = useState<string>('')
    const [isCurrentUserSlug, setIsCurrentUserSlug] = useState(false)

    const debouncedSetSlug = useDebouncedCallback(
        (value: string) => {
            setDebouncedSlug(value);
        },
        300
    );

    useEffect(() => {
        if (currentUser.data) {
            setIsCurrentUserSlug(debouncedSlug === currentUser.data.slug);
        }
    }, [debouncedSlug, currentUser.data]);

    useEffect(() => {
        if (currentUser.data?.slug) {
            setDebouncedSlug(currentUser.data.slug);
        }
    }, [currentUser.data?.slug]);

    const validateSlug = useQuery({
        ...validateSlugOptions({
            query: {
                slug: debouncedSlug
            }
        }),
        enabled: !!debouncedSlug && !isCurrentUserSlug,
    })

    useEffect(() => {
        if (currentUser.data) {
            form.reset({
                name: currentUser.data.name,
                email: currentUser.data.email,
                slug: currentUser.data.slug,
                timezone: currentUser.data.timezone ?? 'America/Sao_Paulo',
            })
        }
    }, [currentUser.data, form])

    async function onSubmit(data: AccountSchema) {
        try {
            setIsLoading(true)

            if (data.slug && data.slug !== currentUser.data?.slug && !validateSlug.data?.is_valid) {
                toast.error('O slug informado já está em uso')
                return
            }

            const changedFields: Partial<AccountSchema> = {}

            if (data.name !== currentUser.data?.name) {
                changedFields.name = data.name
            }
            if (data.email !== currentUser.data?.email) {
                changedFields.email = data.email
            }
            if (data.slug !== currentUser.data?.slug) {
                changedFields.slug = data.slug
            }
            if (data.timezone !== currentUser.data?.timezone) {
                changedFields.timezone = data.timezone
            }

            if (Object.keys(changedFields).length > 0) {
                await updateUser.mutateAsync({
                    body: changedFields
                })
                await currentUser.refetch()
                toast.success('Dados atualizados com sucesso!')
            } else {
                toast.info('Nenhuma alteração detectada')
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error)
            toast.error('Erro ao atualizar dados. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input
                                    className="peer ps-9"
                                    type="text"
                                    placeholder="Nome"
                                    disabled={isLoading}
                                    {...form.register('name')}
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
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input
                                    className="peer ps-9"
                                    type="email"
                                    placeholder="seu@email.com"
                                    disabled={isLoading}
                                    {...form.register('email')}
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
                <FormField control={form.control} name="slug" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                            <div className="relative bg-background">
                                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                    <LinkIcon size={16} aria-hidden="true" />
                                </div>
                                <Input
                                    className="peer ps-9"
                                    type="text"
                                    placeholder="seu-nome"
                                    disabled={isLoading}
                                    {...form.register('slug')}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        debouncedSetSlug(e.target.value);
                                    }}
                                />
                                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                    {field.value && (
                                        isCurrentUserSlug || (!validateSlug.isLoading && validateSlug.data?.is_valid) ? (
                                            <CheckIcon size={16} className="text-green-500" />
                                        ) : validateSlug.isLoading ? (
                                            <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        ) : (
                                            <XIcon size={16} className="text-red-500" />
                                        )
                                    )}
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage>
                            {field.value && !isCurrentUserSlug && !validateSlug.isLoading && !validateSlug.data?.is_valid && (
                                <span className="text-red-500">Este slug já está em uso</span>
                            )}
                        </FormMessage>
                    </FormItem>
                )} />
                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <SelectTimezone
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="ml-auto mt-4"
                    size={"sm"}
                    disabled={isLoading}
                >
                    {isLoading ? 'Salvando...' : 'Salvar'}
                    <SaveIcon className={isLoading ? 'animate-spin' : ''} />
                </Button>
            </form>
        </Form>
    )
}