import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs";
import AdminNavBar from "@/components/admin/adminNavBar";
import { Card } from "@/components/ui/card";

const AdminPage = () => {
    return (
        <Tabs defaultValue="users" className="flex flex-col lg:flex-row flex-1 p-6 gap-3 h-full">
            <AdminNavBar />

            <TabsContent value="users" className="flex-1">
                <Card className="p-4">Kullanıcılar içeriği</Card>
            </TabsContent>

            <TabsContent value="settings" className="flex-1">
                <Card className="p-4">Ayarlar içeriği</Card>
            </TabsContent>
        </Tabs>
    );
};

export default AdminPage;
