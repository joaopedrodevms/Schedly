import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, UsersIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createEventMutation } from "@/service/@tanstack/react-query.gen"
import { useAuth } from "@/context/AuthContext"
import type { EventCreateRequestDto, EventLocation } from "@/service/types.gen"
import { toast } from "sonner"
import { ScrollArea } from "@/components/ui/scroll-area"

type CreateEventDialogProps = {
    onSuccess: () => void
}

export function CreateEventDialog({ onSuccess }: CreateEventDialogProps) {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<Omit<EventCreateRequestDto, "user_id">>({
        title: "",
        description: "",
        slug: "",
        buffer_before: 0,
        buffer_after: 0,
        duration_minutes: 30,
        location_type: "location_in_person"
    })

    const createEvent = useMutation({
        ...createEventMutation(),
        onSuccess: () => {
            onSuccess()
            setIsOpen(false)
        },
        onError: (error) => {
            toast.error("Erro ao criar evento", {
                description: error.detail ? String(error.detail) : "Erro desconhecido"
            })
        }
    })

    const handleInputChange = (field: keyof EventCreateRequestDto, value: string | number | EventLocation) => {
        if (field === 'slug') {
            // Força letras minúsculas e substitui espaços por hífens
            const formattedSlug = (value as string)
                .toLowerCase()
                .replace(/\s+/g, '-')     // Substitui espaços por hífens
                .replace(/[^a-z0-9-]/g, '') // Remove caracteres especiais

            value = formattedSlug
        }

        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = () => {
        if (!user) return

        createEvent.mutate({
            body: {
                ...formData,
                user_id: user.id
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size={"sm"} variant={"outline"}>
                    <PlusIcon />
                    Novo evento
                </Button>
            </DialogTrigger>
            <DialogContent>
                <ScrollArea className="h-[500px] pt-4 pr-4">
                    <div className="flex flex-col gap-4 py-1">
                        <DialogHeader>
                            <DialogTitle>Criar evento</DialogTitle>
                            <DialogDescription>
                                Preencha os campos abaixo para criar um novo evento.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Nome do evento</Label>
                                <Input
                                    placeholder="Reunião de Alinhamento"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Duração (minutos)</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    placeholder="30"
                                    value={formData.duration_minutes}
                                    onChange={(e) => handleInputChange('duration_minutes', parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Local</Label>
                                <Select
                                    value={formData.location_type}
                                    onValueChange={(value) => handleInputChange('location_type', value as EventLocation)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione o local" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="location_in_person">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <UsersIcon size={16} className="text-foreground" />
                                                    <span className="text-md font-semibold">Presencial</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="location_jitsi">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <img height="16" width="16" src="https://cdn.simpleicons.org/jitsi" className="text-white" />
                                                    <span className="text-md font-semibold">Jitsi</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="location_zoom" disabled>
                                                <div className="flex flex-row gap-2 items-center">
                                                    <img height="16" width="16" src="https://img.icons8.com/?size=100&id=7csVZvHoQrLW&format=png&color=000000" className="text-white" />
                                                    <span className="text-md font-semibold">Zoom</span>
                                                    <Badge className="h-4 px-1 ml-auto">Em breve</Badge>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="location_meet" disabled>
                                                <div className="flex flex-row gap-2 items-center">
                                                    <img height="16" width="16" src="https://img.icons8.com/?size=100&id=pE97I4t7Il9M&format=png&color=000000&background=000" className="text-white" />
                                                    <span className="text-md font-semibold">Google Meet</span>
                                                    <Badge className="h-4 px-1 ml-auto">Em breve</Badge>
                                                </div>
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Descrição</Label>
                                <Textarea
                                    placeholder="Inclua informações adicionais sobre o que será tratado na reunião..."
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row w-full gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                    <Label>URL</Label>
                                    <Input
                                        placeholder="Ex: alinhamento-semanal"
                                        value={formData.slug}
                                        onChange={(e) => handleInputChange('slug', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row w-full gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                    <Label>Tempo antes</Label>
                                    <Input
                                        type="number"
                                        value={formData.buffer_before}
                                        onChange={(e) => handleInputChange('buffer_before', parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <Label>Tempo depois</Label>
                                    <Input
                                        type="number"
                                        value={formData.buffer_after}
                                        onChange={(e) => handleInputChange('buffer_after', parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={createEvent.isPending}
                            >
                                {createEvent.isPending ? 'Criando...' : 'Criar'}
                            </Button>
                        </DialogFooter>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
} 