import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs";
import AdminNavBar from "@/components/admin/adminNavBar";
import { Card } from "@/components/ui/card";
import UserListTabContent from "@/components/tabs/admin/userListTabContent.tsx";
import FileListTabContent from "@/components/tabs/admin/fileListTabContent.tsx";

const AdminPage = () => {
    return (
        <main>
            <Tabs defaultValue="users" className="flex flex-col lg:flex-row justify-between items-center p-6 gap-6 flex-1">
                <AdminNavBar/>
                <Card style={{ width: "100%" }} className={"p-5"}>
                    <TabsContent value="users" className="flex-1">
                        <UserListTabContent/>
                    </TabsContent>

                    <TabsContent value="files" className="flex-1">
                        <FileListTabContent/>
                    </TabsContent>

                    <TabsContent value="settings" className="flex-1">
                        <Card className="p-4">Ayarlar içeriği</Card>
                    </TabsContent>
                </Card>
            </Tabs>
        </main>
    );
};

export default AdminPage;
