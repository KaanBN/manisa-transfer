import { JSX } from "react";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import SharedByMeTabContent from "@/tabs/sharedByMeTabContent.tsx";

function UserFileTableCard(): JSX.Element {
    return (
        <Tabs defaultValue="shared-by-me" className="w-full h-full">
            <Card className="w-full h-full flex flex-col">
                <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="shared-by-me">Paylaştığım dosyalar</TabsTrigger>
                        <TabsTrigger value="shared-with-me">Benimle paylaşılanlar</TabsTrigger>
                    </TabsList>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto">
                    <TabsContent value="shared-by-me">
                        <SharedByMeTabContent />
                    </TabsContent>
                    <TabsContent value="shared-with-me">
                        <div>Benimle paylaşılan dosyalar burada olacak</div>
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    );
}

export default UserFileTableCard;
