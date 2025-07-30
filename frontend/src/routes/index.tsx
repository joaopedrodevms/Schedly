import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { SidebarProvider } from "@/components/ui/sidebar"
import Calendar from "@/pages/dashboard/calendar/Calendar"
import Events from "@/pages/dashboard/events/Events"
import Settings from "@/pages/dashboard/settings/Settings"
import ForgotPassword from "@/pages/forgot-password/ForgotPassword"
import Home from "@/pages/home/Home"
import Login from "@/pages/login/Login"
import Register from "@/pages/register/Register"
import Schedule from "@/pages/schedule/Schedule"
import ResetPassword from "@/pages/reset-password/ResetPassword"
import { Route, Routes } from "react-router-dom"

export const Router = () => {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="dashboard" element={
                <SidebarProvider>
                    <DashboardLayout />
                </SidebarProvider>
            }>
                <Route path="calendar" element={<Calendar />} />
                <Route path="events" element={<Events />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    )
}