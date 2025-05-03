import * as React from "react";
import {Card} from "@/components/ui/card.tsx";

type AdminTabDivProps = {
    children: React.ReactNode;
}

const AdminTabDiv = ({children}: AdminTabDivProps) => {
    return (
        <div className={"mx-3 my-auto h-full"}>
            <Card className="w-full h-full p-3 ">
                {children}
            </Card>
        </div>
    );
};

export default AdminTabDiv;