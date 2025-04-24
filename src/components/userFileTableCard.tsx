import { JSX } from "react";
import {
    Card,
    CardContent, CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import SharedByMeTabContent from "@/components/tabs/sharedByMeTabContent.tsx";
import SharedWithMeTabContent from "@/components/tabs/sharedWithMe.tsx";
import {Button} from "@/components/ui/button.tsx";

function UserFileTableCard(): JSX.Element {
    return (
        <Tabs defaultValue="shared-with-me" className="h-full">
            <Card className="flex flex-col h-full">
                <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="shared-with-me">Paylaşılanlar</TabsTrigger>
                        <TabsTrigger value="shared-by-me">Paylaştıklarım</TabsTrigger>
                    </TabsList>
                </CardHeader>

                <CardContent className="flex-1 overflow-auto">
                    <TabsContent value="shared-with-me" className="h-full">
                        <SharedWithMeTabContent />
                    </TabsContent>
                    <TabsContent value="shared-by-me" className="h-full">
                        <SharedByMeTabContent />
                    </TabsContent>
                </CardContent>

                <CardFooter className={"flex justify-end space-x-2"}>
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        Geri
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                    >
                        İleri
                    </Button>
                </CardFooter>
            </Card>
        </Tabs>
    );
}

export default UserFileTableCard;
