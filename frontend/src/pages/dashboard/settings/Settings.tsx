import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getUserOptions } from "@/service/@tanstack/react-query.gen";
import { AccountForm } from "./components/AccountForm";
import { ProfileBackground } from "./components/ProfileBackground";
import { ProfileAvatar } from "./components/ProfileAvatar";

export default function Settings() {
    const currentUser = useQuery({
        ...getUserOptions(),
        retry: false,
    });

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full lg:max-w-[800px] flex flex-col gap-2">
                <Card>
                    <CardHeader>
                        <ProfileBackground currentUser={currentUser} />
                        <ProfileAvatar currentUser={currentUser} />
                    </CardHeader>
                    <CardContent>
                        <AccountForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}