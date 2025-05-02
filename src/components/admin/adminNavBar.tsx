import { Card } from "@/components/ui/card";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminNavBar = () => {
    return (
        <Card className="w-full lg:w-[17.5em] h-fit lg:self-center p-0 lg:p-3 overflow-x-auto lg:overflow-visible">
            <TabsList
                className="flex flex-row lg:flex-col gap-2 w-full p-0 lg:p-2 bg-transparent h-full"
            >
                <TabsTrigger
                    value="users"
                    className="min-w-[8rem] lg:min-w-0 w-full text-left px-4 py-2 data-[state=active]:bg-muted data-[state=active]:font-bold"
                >
                    Kullanıcılar
                </TabsTrigger>
                <TabsTrigger
                    value="settings"
                    className="min-w-[8rem] lg:min-w-0 w-full text-left px-4 py-2 data-[state=active]:bg-muted data-[state=active]:font-bold"
                >
                    Ayarlar
                </TabsTrigger>
            </TabsList>
        </Card>
    );
};

export default AdminNavBar;