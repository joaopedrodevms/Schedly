import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFileUpload } from "@/hooks/use-file-upload";
import { ImageIcon, ImagePlusIcon, LinkIcon, MailIcon, SaveIcon, UserIcon, XIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectTimezone from "@/components/SelectTimezone";

const formSchema = z.object({
    name: z.string(),
    email: z.email(),
    link: z.string(),
})

type AccountShema = z.infer<typeof formSchema>

const initialBgImage = [
    {
        name: "profile-bg.jpg",
        size: 1528737,
        type: "image/jpeg",
        url: "https://originui.com/profile-bg.jpg",
        id: "profile-bg-123456789",
    },
]
const initialAvatarImage = [
    {
        name: "avatar-72-01.jpg",
        size: 1528737,
        type: "image/jpeg",
        url: "https://originui.com/avatar-72-01.jpg",
        id: "avatar-123456789",
    },
]

export default function UserSection() {

    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<AccountShema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            link: '',
        }
    })

    async function onSubmit(data: AccountShema) {
        setIsLoading(true)
        console.log(data)
        setIsLoading(false)
    }

    return (
        <Card>
            <CardHeader>
                <ProfileBg />
                <Avatar />
            </CardHeader>
            <CardContent>
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
                            <FormItem className="">
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
                        <FormField control={form.control} name="link" render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Link</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            className="peer ps-9"
                                            type="text"
                                            placeholder="Link"
                                            disabled={isLoading}
                                            {...form.register('link')}
                                            {...field}
                                        />
                                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                            <LinkIcon size={16} aria-hidden="true" />
                                        </div>
                                    </div>
                                    
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <SelectTimezone />
                        <Button type="submit" className="ml-auto mt-4" size={"sm"}>Salvar<SaveIcon /></Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

function ProfileBg() {
    const [{ files }, { removeFile, openFileDialog, getInputProps }] =
        useFileUpload({
            accept: "image/*",
            initialFiles: initialBgImage,
        })

    const currentImage = files[0]?.preview || null

    return (
        <div className="h-32">
            <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden group rounded-md">
                {currentImage ? (
                    <img
                        className="size-full object-cover"
                        src={currentImage}
                        alt={
                            files[0]?.preview
                                ? "Preview of uploaded image"
                                : "Default profile background"
                        }
                        width={512}
                        height={96}
                    />
                ) : (
                    <ImageIcon size={60} className="text-muted-foreground" />
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                    <button
                        type="button"
                        className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow,opacity] outline-none hover:bg-black/80 focus-visible:ring-[3px] opacity-0 group-hover:opacity-100"
                        onClick={openFileDialog}
                        aria-label={currentImage ? "Change image" : "Upload image"}
                    >
                        <ImagePlusIcon size={16} aria-hidden="true" />
                    </button>
                    {currentImage && (
                        <button
                            type="button"
                            className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow,opacity] outline-none hover:bg-black/80 focus-visible:ring-[3px] opacity-0 group-hover:opacity-100"
                            onClick={() => removeFile(files[0]?.id)}
                            aria-label="Remove image"
                        >
                            <XIcon size={16} aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
            <input
                {...getInputProps()}
                className="sr-only"
                aria-label="Upload image file"
            />
        </div>
    )
}
function Avatar() {
    const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
        accept: "image/*",
        initialFiles: initialAvatarImage,
    })

    const currentImage = files[0]?.preview || null

    return (
        <div className="-mt-10 px-6">
            <div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10 group">
                {currentImage ? (
                    <img
                        src={currentImage}
                        className="size-full object-cover"
                        width={80}
                        height={80}
                        alt="Profile image"
                    />
                ) : (
                    <UserIcon size={40} className="text-muted-foreground" />
                )}
                <button
                    type="button"
                    className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow,opacity] outline-none hover:bg-black/80 focus-visible:ring-[3px] opacity-0 group-hover:opacity-100"
                    onClick={openFileDialog}
                    aria-label="Change profile picture"
                >
                    <ImagePlusIcon size={16} aria-hidden="true" className="" />
                </button>
                <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload profile picture"
                />
            </div>
        </div>
    )
}