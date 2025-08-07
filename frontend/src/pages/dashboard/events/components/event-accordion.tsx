import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckIcon, ClockIcon, CopyIcon, TrashIcon, UsersIcon, XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { deleteEventMutation, updateEventMutation } from "@/service/@tanstack/react-query.gen"
import { useAuth } from "@/context/AuthContext"
import type { EventDto, EventLocation, EventUpdateRequestDto } from "@/service/types.gen"
import { Availabilities } from "./availabilities"

const appUrl = process.env.VITE_APP_URL || 'http://localhost:5173';
if (!appUrl) {
  throw new Error('VITE_APP_URL não está definida no arquivo .env');
}

type EventChanges = {
    [key: string]: EventUpdateRequestDto
}

type SlugValidation = {
    [key: string]: {
        isValid: boolean,
        message?: string
    }
}

type EventAccordionProps = {
    events: EventDto[]
    onSuccess: () => void
}

export function EventAccordion({ events, onSuccess }: EventAccordionProps) {
    const [copied, setCopied] = useState<boolean>(false)
    const [eventChanges, setEventChanges] = useState<EventChanges>({})
    const [slugValidation, setSlugValidation] = useState<SlugValidation>({})
    const [slugInputs, setSlugInputs] = useState<{ [key: string]: string }>({})
    const { user } = useAuth()

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    const updateEvents = useMutation({
        ...updateEventMutation(),
        onSuccess: () => {
            onSuccess()
            setEventChanges({})
        }
    })

    const deleteEvents = useMutation({
        ...deleteEventMutation(),
        onSuccess: () => {
            onSuccess()
        }
    })

    const validateSlug = (slug: string, eventId: string) => {
        // Verifica se está vazio
        if (!slug) {
            setSlugValidation(prev => ({
                ...prev,
                [eventId]: { isValid: false, message: "URL não pode estar vazia" }
            }))
            return false
        }

        // Verifica caracteres especiais, espaços e letras maiúsculas
        const slugRegex = /^[a-z0-9-]+$/
        if (!slugRegex.test(slug)) {
            setSlugValidation(prev => ({
                ...prev,
                [eventId]: { 
                    isValid: false, 
                    message: "Use apenas letras minúsculas, números e hífens" 
                }
            }))
            return false
        }

        // Verifica se já existe
        const existingEvent = events.find(event => event.slug === slug && event.id !== eventId)
        if (existingEvent) {
            setSlugValidation(prev => ({
                ...prev,
                [eventId]: { isValid: false, message: "Esta URL já está em uso" }
            }))
            return false
        }

        // Slug válido
        setSlugValidation(prev => ({
            ...prev,
            [eventId]: { isValid: true }
        }))
        return true
    }

    const handleInputChange = (eventId: string, field: keyof EventUpdateRequestDto, value: string | number | EventLocation) => {
        if (field === 'slug') {
            // Força letras minúsculas e substitui espaços por hífens
            const formattedSlug = (value as string)
                .toLowerCase()
                .replace(/\s+/g, '-')     // Substitui espaços por hífens
                .replace(/[^a-z0-9-]/g, '') // Remove caracteres especiais
            
            validateSlug(formattedSlug, eventId)
            setSlugInputs(prev => ({
                ...prev,
                [eventId]: formattedSlug
            }))
            value = formattedSlug
        }
        
        setEventChanges(prev => ({
            ...prev,
            [eventId]: {
                ...prev[eventId],
                id: eventId,
                [field]: value
            } as EventUpdateRequestDto
        }))
    }

    const handleSave = (eventId: string) => {
        const changes = eventChanges[eventId]
        if (changes && (changes.slug === undefined || slugValidation[eventId]?.isValid)) {
            updateEvents.mutate({
                body: changes
            })
        }
    }

    const getEventUrl = (event: { id: string, slug: string }) => {
        // Se houver uma mudança no slug, use o novo valor
        const currentSlug = slugInputs[event.id] ?? event.slug
        return `${appUrl}/${user?.slug}/${currentSlug}`
    }

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full space-y-2"
        >
            {events.map((event) => (
                <AccordionItem
                    value={event.id}
                    key={event.id}
                    className="bg-card has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
                >
                    <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                        <div className="flex flex-col leading-none">
                            <h2 className="text-lg font-bold ">{event.title}</h2>
                            <p className="text-muted-foreground text-sm">
                                {event.duration_minutes} Minutos
                            </p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 pt-4 px-4 border-t">
                        <div className="flex flex-col gap-2 w-full">
                            <Label>Local</Label>
                            <Select 
                                defaultValue={event.location_type}
                                onValueChange={(value) => handleInputChange(event.id, 'location_type', value as EventLocation)}
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
                                defaultValue={event.description} 
                                onChange={(e) => handleInputChange(event.id, 'description', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <Label>Duração</Label>
                                <div className="relative bg-background">
                                    <Input 
                                        className="peer pe-9" 
                                        type="number" 
                                        defaultValue={event.duration_minutes.toString()} 
                                        onChange={(e) => handleInputChange(event.id, 'duration_minutes', parseInt(e.target.value))}
                                    />
                                    <div className=" pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                        <ClockIcon size={16} className="text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label>URL</Label>
                                <div className="relative bg-background">
                                    <Input 
                                        className={cn(
                                            "peer pe-9",
                                            eventChanges[event.id]?.slug && !slugValidation[event.id]?.isValid && "border-red-500 focus-visible:ring-red-500"
                                        )}
                                        placeholder="Ex: alinhamento-semanal" 
                                        type="url" 
                                        value={slugInputs[event.id] ?? event.slug}
                                        onChange={(e) => handleInputChange(event.id, 'slug', e.target.value)}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                        {eventChanges[event.id]?.slug ? (
                                            slugValidation[event.id]?.isValid ? (
                                                <CheckIcon size={16} className="text-green-500" />
                                            ) : (
                                                <XIcon size={16} className="text-red-500" />
                                            )
                                        ) : (
                                            <CheckIcon size={16} className="text-green-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {eventChanges[event.id]?.slug && slugValidation[event.id]?.message && (
                                <p className="text-sm text-red-500">
                                    {slugValidation[event.id].message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <Label>Tempo antes</Label>
                                <div className="relative bg-background">
                                    <Input 
                                        className="peer pe-9" 
                                        type="number" 
                                        defaultValue={event.buffer_before.toString()} 
                                        onChange={(e) => handleInputChange(event.id, 'buffer_before', parseInt(e.target.value))}
                                    />
                                    <div className=" pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                        <ClockIcon size={16} className="text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label>Tempo depois</Label>
                                <div className="relative bg-background">
                                    <Input 
                                        className="peer pe-9" 
                                        type="number" 
                                        defaultValue={event.buffer_after.toString()} 
                                        onChange={(e) => handleInputChange(event.id, 'buffer_after', parseInt(e.target.value))}
                                    />
                                    <div className=" pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                        <ClockIcon size={16} className="text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Link do evento</Label>
                            <div className="relative bg-background">
                                <Input
                                    className="pe-9"
                                    type="text"
                                    value={getEventUrl(event)}
                                    readOnly
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleCopy(getEventUrl(event))
                                    }}
                                    type="button"
                                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                                    aria-label={copied ? "Copiado" : "Copiar para área de transferência"}
                                    disabled={copied}
                                >
                                    <div
                                        className={cn(
                                            "transition-all",
                                            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                        )}
                                    >
                                        <CheckIcon
                                            className="stroke-emerald-500"
                                            size={16}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div
                                        className={cn(
                                            "absolute transition-all",
                                            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                                        )}
                                    >
                                        <CopyIcon size={16} aria-hidden="true" />
                                    </div>
                                </button>
                            </div>
                        </div>
                        <Availabilities eventId={event.id} />
                        <div className="flex flex-row items-center justify-end gap-2">
                            {eventChanges[event.id] && (
                                <Button 
                                    variant={"outline"}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleSave(event.id)
                                    }}
                                    disabled={updateEvents.isPending}
                                >
                                    {updateEvents.isPending ? 'Salvando...' : 'Salvar'}
                                </Button>
                            )}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size={"icon"}>
                                        <TrashIcon />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                                        <div
                                            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                                            aria-hidden="true"
                                        >
                                            <TrashIcon className="opacity-80" size={16} />
                                        </div>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Excluir evento?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Os usuários não poderão agendar outras reuniões com os tipos de eventos excluídos. As reuniões previamente agendadas não serão afetadas.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => {
                                            deleteEvents.mutate({
                                                query: {
                                                    event_id: event.id ?? ""
                                                }
                                            })
                                        }}>Excluir</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
} 