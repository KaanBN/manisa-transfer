import {JSX, useEffect, useRef, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader,} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs";
import SharedByMeTabContent from "@/components/tabs/sharedByMeTabContent.tsx";
import {Button} from "@/components/ui/button.tsx";
import SharedWithMeTabContent from "@/components/tabs/sharedWithMeTabContent.tsx";
import {PaginationHandle} from "@/types/paginationHandle.ts";

function UserFileTableCard(): JSX.Element {
    const sharedWithMeRef = useRef<PaginationHandle>(null);
    const sharedByMeRef = useRef<PaginationHandle>(null);
    const [activeTab, setActiveTab] = useState("shared-with-me");

    const [canGoNext, setCanGoNext] = useState(false);
    const [canGoPrevious, setCanGoPrevious] = useState(false);

    const updateNavigationState = () => {
        const activeRef = activeTab === "shared-with-me" ? sharedWithMeRef : sharedByMeRef;
        if (activeRef.current) {
            setCanGoNext(activeRef.current.getCanNextPage());
            setCanGoPrevious(activeRef.current.getCanPreviousPage());
        }
    };

    useEffect(() => {
        updateNavigationState();
    }, [activeTab]);

    const handleNextPage = () => {
        (activeTab === "shared-with-me" ? sharedWithMeRef : sharedByMeRef).current?.nextPage();
    };

    const handlePreviousPage = () => {
        (activeTab === "shared-with-me" ? sharedWithMeRef : sharedByMeRef).current?.previousPage();
    };

    return (
        <Tabs defaultValue="shared-with-me" onValueChange={setActiveTab}>
            <Card className="flex flex-col overflow-y-auto lg:min-h-[75vh] 2xl:min-h-[770px] lg:max-h-[75vh]">
                <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="shared-with-me">Paylaşılanlar</TabsTrigger>
                        <TabsTrigger value="shared-by-me">Paylaştıklarım</TabsTrigger>
                    </TabsList>
                </CardHeader>

                <CardContent className="flex-1 overflow-auto">
                    <TabsContent value="shared-with-me">
                        <SharedWithMeTabContent
                            ref={sharedWithMeRef}
                            onDataReady={updateNavigationState}
                        />
                    </TabsContent>
                    <TabsContent value="shared-by-me">
                        <SharedByMeTabContent
                            ref={sharedByMeRef}
                            onDataReady={updateNavigationState}
                        />
                    </TabsContent>
                </CardContent>

                <CardFooter className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={!canGoPrevious}
                    >
                        Geri
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={!canGoNext}
                    >
                        İleri
                    </Button>
                </CardFooter>
            </Card>
        </Tabs>
    );
}

export default UserFileTableCard;
