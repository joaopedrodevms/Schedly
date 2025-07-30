import { Link, Outlet, useLocation } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarRail, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { BoltIcon, CalendarIcon, CalendarRangeIcon, LogOut, TicketIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/theme/mode-toggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export interface SidebarLink {
    name: string;
    icon: any;
    selected: boolean;
    to: string;
}

export const sidebarLinks: SidebarLink[] = [
    {
        name: "Calendário",
        icon: CalendarIcon,
        selected: true,
        to: "/dashboard/calendar"
    },
    {
        name: "Eventos",
        icon: TicketIcon,
        selected: false,
        to: "/dashboard/events"
    },
    {
        name: "Configurações",
        icon: BoltIcon,
        selected: false,
        to: "/dashboard/settings"
    }
];

export default function DashboardLayout() {

    const { state, isMobile, setOpenMobile } = useSidebar();
    const [sidebarLink, setSidebarLink] = useState(sidebarLinks);
    const location = useLocation();
    const activeLink = sidebarLink.find(link => link.selected);

    useEffect(() => {
        setSidebarLink(sidebarLink.map(l => l.to === location.pathname ? { ...l, selected: true } : { ...l, selected: false }));
    }, [location.pathname]);

    return (
        <>
            <Sidebar collapsible="icon" variant="floating">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            {state == "collapsed" ? (
                                <div className="p-1 border rounded-md bg-foreground flex items-center justify-center">
                                    <CalendarRangeIcon className="size-6 text-muted" />
                                </div>
                            ) : (

                                <div className="w-full flex items-center gap-2 p-2">
                                    <div className="p-1 border rounded-md bg-foreground flex items-center justify-center">
                                        <CalendarRangeIcon className="size-6 text-muted" />
                                    </div>
                                    <span className="font-semibold">Schedly</span>
                                </div>
                            )}
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Navegação</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {sidebarLink.map(link => (
                                    <SidebarMenuItem key={link.name}>
                                        <Link
                                            to={link.to}
                                            onClick={() => {
                                                if (isMobile) {
                                                    setOpenMobile(false)
                                                }
                                            }}>
                                            <Button size={"sm"} className={cn("w-full flex items-center", state === "collapsed" ? "justify-center" : "justify-start")} variant={link.selected ? "default" : "ghost"}>
                                                <link.icon className="h-4 w-4" />
                                                {state === "expanded" && <span className="font-semibold">{link.name}</span>}
                                            </Button>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <Button size={"sm"} className={cn("w-full flex items-center", state === "collapsed" ? "justify-center" : "justify-start")} variant={"ghost"}>
                        <LogOut />
                        {state === "expanded" && <span className="font-semibold">Sair</span>}
                    </Button>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>
                <div className="min-h-screen w-full overflow-hidden">
                    <header className="flex shrink-0 border-b items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:my-4 py-2 mb-2">
                        <div className="flex items-center w-full gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <div className="font-bold">{activeLink?.name ?? "Dashboard"}</div>
                        </div>
                        <div className="flex gap-2 px-4">
                            <ModeToggle />
                        </div>
                    </header>
                    <ScrollArea className="h-[calc(100vh-92px)]">
                        <Outlet />
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </SidebarInset>

        </>
    )
}