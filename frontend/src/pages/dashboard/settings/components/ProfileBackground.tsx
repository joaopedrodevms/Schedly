import { useAuth } from "@/context/AuthContext";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ImageIcon, ImagePlusIcon, XIcon } from "lucide-react";
import { removeCoverMutation, updateCoverMutation } from "@/service/@tanstack/react-query.gen";

interface ProfileBackgroundProps {
    currentUser: ReturnType<typeof useQuery>;
}

export function ProfileBackground({ currentUser }: ProfileBackgroundProps) {
    const { user } = useAuth();
    const updateCover = useMutation({
        ...updateCoverMutation()
    })
    const removeCover = useMutation({
        ...removeCoverMutation()
    })

    const [{ files }, { removeFile, openFileDialog, getInputProps }] =
        useFileUpload({
            accept: "image/*",
            initialFiles: user?.cover_url ? [{
                name: "cover.jpg",
                size: 1528737,
                type: "image/jpeg",
                url: user?.cover_url,
                id: user?.id ?? "",
            }] : [],
            onFilesAdded: async (files) => {
                if (files[0]) {
                    await updateCover.mutateAsync({ body: { file: files[0].file as File } })
                    await currentUser.refetch()
                }
            }
        })

    const handleRemoveCover = async () => {
        await removeCover.mutateAsync({})
        if (files[0]?.id) {
            removeFile(files[0].id)
            await currentUser.refetch()
        }
    }

    const currentImage = files[0]?.preview || user?.cover_url || null

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
                            onClick={handleRemoveCover}
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