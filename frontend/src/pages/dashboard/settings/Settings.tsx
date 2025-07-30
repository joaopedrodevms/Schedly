import UserSection from "./components/UserSection"
import PasswordSection from "./components/PasswordSection"
import DeleteSection from "./components/DeleteSection"


export default function Settings() {

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full lg:max-w-[800px] flex flex-col gap-2">
                <UserSection />
                <PasswordSection />
                <DeleteSection />
            </div>
        </div>
    )
}