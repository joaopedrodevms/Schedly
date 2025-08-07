import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AuthProvider } from "@/context/AuthContext"
import Calendar from "@/pages/dashboard/calendar/Calendar"
import Events from "@/pages/dashboard/events/Events"
import Settings from "@/pages/dashboard/settings/Settings"
import Home from "@/pages/home/Home"
import Login from "@/pages/login/Login"
import Register from "@/pages/register/Register"
import Schedule from "@/pages/schedule/Schedule"
import { NotFound } from "@/pages/404/404"
import { Route, Routes } from "react-router-dom"

export const Router = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/:user_slug/:event_slug" element={<Schedule />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Rotas protegidas */}
                <Route>
                    <Route path="dashboard" element={
                        <SidebarProvider>
                            <DashboardLayout />
                        </SidebarProvider>
                    }>
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="events" element={<Events />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    )
}