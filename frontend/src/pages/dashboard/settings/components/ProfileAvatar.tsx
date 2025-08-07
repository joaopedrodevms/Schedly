import { useAuth } from "@/context/AuthContext";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImagePlusIcon, UserIcon, XIcon } from "lucide-react";
import { removeAvatarMutation, updateAvatarMutation } from "@/service/@tanstack/react-query.gen";

interface ProfileAvatarProps {
    currentUser: ReturnType<typeof useQuery>;
}

export function ProfileAvatar({ currentUser }: ProfileAvatarProps) {
    const { user } = useAuth();
    const updateAvatar = useMutation({
        ...updateAvatarMutation()
    })
    const removeAvatar = useMutation({
        ...removeAvatarMutation()
    })

    const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
        accept: "image/*",
        initialFiles: user?.avatar_url ? [{
            name: "avatar.jpg",
            size: 1528737,
            type: "image/jpeg",
            url: user?.avatar_url,
            id: user?.id ?? "",
        }] : [],
        onFilesAdded: async (files) => {
            if (files[0]) {
                await updateAvatar.mutateAsync({ body: { file: files[0].file as File } })
                await currentUser.refetch()
            }
        }
    })

    const handleRemoveAvatar = async () => {
        await removeAvatar.mutateAsync({})
        if (files[0]?.id) {
            removeFile(files[0].id)
            await currentUser.refetch()
        }
    }

    const currentImage = files[0]?.preview || user?.avatar_url || null

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
                <div className="absolute flex gap-2">
                    <button
                        type="button"
                        className="focus-visible:border-ring focus-visible:ring-ring/50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow,opacity] outline-none hover:bg-black/80 focus-visible:ring-[3px] opacity-0 group-hover:opacity-100"
                        onClick={openFileDialog}
                        aria-label="Change profile picture"
                    >
                        <ImagePlusIcon size={16} aria-hidden="true" className="" />
                    </button>
                    {currentImage && (
                        <button
                            type="button"
                            className="focus-visible:border-ring focus-visible:ring-ring/50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow,opacity] outline-none hover:bg-black/80 focus-visible:ring-[3px] opacity-0 group-hover:opacity-100"
                            onClick={handleRemoveAvatar}
                            aria-label="Remove profile picture"
                        >
                            <XIcon size={16} aria-hidden="true" />
                        </button>
                    )}
                </div>
                <input
                    {...getInputProps()}
                    className="sr-only"
                    aria-label="Upload profile picture"
                />
            </div>
        </div>
    )
}