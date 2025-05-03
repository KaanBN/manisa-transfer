import * as React from "react";

type AdminTabDivProps = {
    children: React.ReactNode;
}

const AdminTabDiv = ({children}: AdminTabDivProps) => {
    return (
        <div className="w-full h-full flex flex-col lg:min-h-[75vh] 2xl:min-h-[770px] lg:max-h-[75vh]">
            {children}
        </div>
    );
};

export default AdminTabDiv;