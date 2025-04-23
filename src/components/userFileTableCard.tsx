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
import SharedWithMeTabContent from "@/tabs/sharedWithMe.tsx";

function UserFileTableCard(): JSX.Element {
    return (
        <Tabs defaultValue="shared-by-me" className="h-full">
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="shared-by-me">Paylaştıklarım</TabsTrigger>
                        <TabsTrigger value="shared-with-me">Paylaşılanlar</TabsTrigger>
                    </TabsList>
                </CardHeader>

                <CardContent className="flex-1 overflow-auto">
                    <TabsContent value="shared-by-me" className="h-full">
                        <SharedByMeTabContent />
                    </TabsContent>
                    <TabsContent value="shared-with-me" className="h-full">
                        <SharedWithMeTabContent />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    );
}

export default UserFileTableCard;
