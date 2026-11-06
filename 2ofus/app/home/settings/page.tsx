import { getCurrentUser } from "@/lib/auth"
import Settings from "@/features/profile-page/Settings";

export default async function SettingsPage() {

    const { user, coupleData } = await getCurrentUser();



    return <Settings />
}