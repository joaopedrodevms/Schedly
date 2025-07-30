import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ModeToggle } from "@/theme/mode-toggle"
import { Menu } from "lucide-react"
import { CalendarRangeIcon } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="rounded-md bg-background border-border flex items-center gap-2 py-2 px-4">
                        <div className="p-1 border rounded-md bg-foreground flex items-center justify-center">
                            <CalendarRangeIcon className="size-6 text-muted" />
                        </div>
                        <span className="font-semibold">Schedly</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <Button variant="ghost" className="hidden sm:inline-flex" asChild>
                        <Link to="/login">Entrar</Link>
                    </Button>
                    <Button variant="default" className="hidden sm:inline-flex" asChild>
                        <Link to="/register">Criar Conta</Link>
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="w-full">
                            <div className="flex flex-col gap-2 mt-8 p-4">
                                <Button variant="secondary" asChild className="w-full">
                                    <Link to="/login">Entrar</Link>
                                </Button>
                                <Button variant="default" asChild className="w-full">
                                    <Link to="/register">Criar Conta</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
} 