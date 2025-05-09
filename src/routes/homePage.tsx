import UploadCard from "@/components/uploadCard.tsx";
import UserFileTableCard from "@/components/userFileTableCard.tsx";
import {useAuth} from "@/context/authContext.tsx";
import {useEffect} from "react";

const HomePage = () => {
    const {isAuthenticated, twoFaState} = useAuth()

    return (
        <main className="flex flex-col lg:flex-row justify-between p-6 gap-6 flex-1">
            <div className="lg:self-center">
                <UploadCard/>
            </div>

            {
                isAuthenticated && (
                    <div className="flex-1 min-w-0 lg:self-center">
                        <UserFileTableCard/>
                    </div>
                )
            }
        </main>
    );
}

export default HomePage;