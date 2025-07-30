import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateInput, TimeField } from "@/components/ui/datefield-rac"
import { CheckIcon, CopyIcon, LinkIcon, PlusIcon, TrashIcon, UsersIcon, XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Availabilities } from "./components/availabilities"

export default function Events() {


    const [copied, setCopied] = useState<boolean>(false)
    const handleCopy = () => {
        // if (inputRef.current) {
        //   navigator.clipboard.writeText(inputRef.current.value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
        // }
    }

    return (
        // <div className="flex items-center justify-center p-6 h-[calc(100vh-92px)]">
        //     <div className="w-full lg:max-w-[800px] flex flex-col gap-2">
        //         <div className="border rounded-md border-border border-dashed flex flex-col gap-10 items-center justify-center text-muted-foreground bg-card p-10">
        //             <CalendarPlusIcon className="h-20 w-20" strokeWidth={1} />
        //             <div className="flex flex-col gap-2 text-center">
        //                 <h2 className="text-2xl font-bold tracking-tight">Crie links de agendamento com os tipos de evento</h2>
        //                 <p className="text-muted-foreground">
        //                     Crie tipos de eventos para as reuniões que você quiser agendar regularmente, como demonstrações de produtos, chamadas com clientes, horários de atendimento e outras.
        //                 </p>
        //             </div>
        //             <Button
        //                 variant={"default"}
        //                 onClick={() => {
        //                     // setDialogTask(true)
        //                 }}>
        //                 <PlusIcon />
        //                 Criar novo evento
        //             </Button>
        //         </div>
        //     </div>
        // </div>
        <div className="flex items-center justify-center p-6">
            <div className="w-full lg:max-w-[800px] flex flex-col gap-2">
                <div className="flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size={"sm"} className="ml-auto" variant={"outline"}>
                                <PlusIcon />
                                Novo evento
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Criar evento</DialogTitle>
                                <DialogDescription>
                                    Preencha os campos abaixo para criar um novo evento.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-2">
                                <Label>Nome do evento</Label>
                                <Input placeholder="Reunião de Alinhamento" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Duração</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione uma duração" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="15">15 Minutos</SelectItem>
                                            <SelectItem value="30">30 Minutos</SelectItem>
                                            <SelectItem value="45">45 Minutos</SelectItem>
                                            <SelectItem value="60">1 Hora</SelectItem>
                                            <SelectItem value="90">1 Hora e 30 Minutos</SelectItem>
                                            <SelectItem value="120">2 Horas</SelectItem>
                                            <SelectItem value="180">3 Horas</SelectItem>
                                            <SelectItem value="240">4 Horas</SelectItem>
                                            <SelectItem value="300">5 Horas</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button type="submit">Criar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-2"
                    defaultValue="3"
                >
                    <AccordionItem
                        value={"asd"}
                        key={"asd"}
                        className="bg-card has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]"
                    >
                        <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline focus-visible:ring-0">
                            <div className="flex flex-col leading-none">
                                <h2 className="text-lg font-bold ">Reunião de Alinhamento</h2>
                                <p className="text-muted-foreground text-sm">
                                    30 Minutos
                                </p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 pt-4 px-4 border-t">
                            <div className="flex flex-col gap-2 w-full">
                                <Label>Local</Label>
                                <Select defaultValue={"jitsi"}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione o local" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="presencial">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <UsersIcon size={16} className="text-foreground" />
                                                    <span className="text-md font-semibold">Presencial</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="jitsi">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <img height="16" width="16" src="https://cdn.simpleicons.org/jitsi" className="text-white" />
                                                    <span className="text-md font-semibold">Jitsi</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="zoom" disabled>
                                                <div className="flex flex-row gap-2 items-center">
                                                    <img height="16" width="16" src="https://img.icons8.com/?size=100&id=7csVZvHoQrLW&format=png&color=000000" className="text-white" />
                                                    <span className="text-md font-semibold">Zoom</span>
                                                    <Badge className="h-4 px-1 ml-auto">Em breve</Badge>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="google-meet" disabled>
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
                                <Textarea placeholder="Inclua informações adicionais sobre o que será tratado na reunião..." />
                            </div>
                            <div className="flex flex-col md:flex-row w-full gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                    <Label>Duração</Label>
                                    <Select defaultValue="30">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Duração" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="15">15 Minutos</SelectItem>
                                                <SelectItem value="30">30 Minutos</SelectItem>
                                                <SelectItem value="45">45 Minutos</SelectItem>
                                                <SelectItem value="60">1 Hora</SelectItem>
                                                <SelectItem value="custom">Personalizado</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <Label>URL</Label>
                                    <div className="relative bg-background">
                                        <Input className="peer pe-9" placeholder="Ex: alinhamento-semanal" type="url" />
                                        <div className=" pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                                            {/* <CheckIcon size={16} className="text-green-500" /> */}
                                            <XIcon size={16} className="text-red-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row w-full gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                    <Label>Tempo antes</Label>
                                    <Select defaultValue="5">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Ex: 10 min" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="0">Sem pausa</SelectItem>
                                                <SelectItem value="5">5 Minutos</SelectItem>
                                                <SelectItem value="10">10 Minutos</SelectItem>
                                                <SelectItem value="15">15 Minutos</SelectItem>
                                                <SelectItem value="30">30 Minutos</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <Label>Tempo depois</Label>
                                    <Select defaultValue="10">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Ex: 10 min" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="0">Sem pausa</SelectItem>
                                                <SelectItem value="5">5 Minutos</SelectItem>
                                                <SelectItem value="10">10 Minutos</SelectItem>
                                                <SelectItem value="15">15 Minutos</SelectItem>
                                                <SelectItem value="30">30 Minutos</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Link do evento</Label>
                                <div className="relative bg-background">
                                    <Input
                                        className="pe-9"
                                        type="text"
                                        defaultValue="https://schedly.com.br/joaopedro/reuniao-de-alinhamento"
                                        readOnly
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
                                        aria-label={copied ? "Copied" : "Copy to clipboard"}
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
                            <Availabilities />
                            <div className="flex flex-row items-center justify-between">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size={"icon"} className="ml-auto">
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
                                            <AlertDialogAction>Excluir</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}