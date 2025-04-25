import {JSX, useRef, useState, useEffect} from "react";
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
import {Button} from "@/components/ui/button.tsx";
import SharedWithMeTabContent from "@/components/tabs/sharedWithMeTabContent.tsx";
import {PaginationHandle} from "@/types/paginationHandle.ts";

function UserFileTableCard(): JSX.Element {
    const sharedWithMeRef = useRef<PaginationHandle>(null);
    const sharedByMeRef = useRef<PaginationHandle>(null);
    const [activeTab, setActiveTab] = useState("shared-with-me");

    const [canGoNext, setCanGoNext] = useState(false);
    const [canGoPrevious, setCanGoPrevious] = useState(false);

    useEffect(() => {
        const updateNavigationState = () => {
            const activeRef = activeTab === "shared-with-me" ? sharedWithMeRef : sharedByMeRef;

            if (activeRef.current) {
                const canNext = activeRef.current.getCanNextPage();
                const canPrev = activeRef.current.getCanPreviousPage();

                setCanGoNext(canNext);
                setCanGoPrevious(canPrev);
            }
        };

        setTimeout(updateNavigationState, 0);
    }, [activeTab]);

    const handleNextPage = () => {
        if (activeTab === "shared-with-me") {
            sharedWithMeRef.current?.nextPage();
        } else {
            sharedByMeRef.current?.nextPage();
        }

        setTimeout(() => {
            const activeRef = activeTab === "shared-with-me" ? sharedWithMeRef : sharedByMeRef;
            if (activeRef.current) {
                setCanGoNext(activeRef.current.getCanNextPage());
                setCanGoPrevious(activeRef.current.getCanPreviousPage());
            }
        }, 0);
    };

    const handlePreviousPage = () => {
        if (activeTab === "shared-with-me") {
            sharedWithMeRef.current?.previousPage();
        } else {
            sharedByMeRef.current?.previousPage();
        }

        setTimeout(() => {
            const activeRef = activeTab === "shared-with-me" ? sharedWithMeRef : sharedByMeRef;
            if (activeRef.current) {
                setCanGoNext(activeRef.current.getCanNextPage());
                setCanGoPrevious(activeRef.current.getCanPreviousPage());
            }
        }, 0);
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
                        <SharedWithMeTabContent ref={sharedWithMeRef} />
                    </TabsContent>
                    <TabsContent value="shared-by-me">
                        <SharedByMeTabContent ref={sharedByMeRef} />
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
