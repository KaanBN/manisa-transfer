import {JSX} from 'react';
import bg from './assets/images/background.png';
import Navbar from "@/components/navbar";
import UploadCard from "@/components/uploadCard.tsx";
import UserFileTableCard from "@/components/userFileTableCard.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

function App(): JSX.Element {
    return (
        <div
            className="bg-cover bg-no-repeat min-h-screen"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            <Toaster />
            <Navbar />

            <div className="flex flex-col lg:flex-row justify-between p-6 gap-6 self-center">
                <div className="lg:self-center">
                    <UploadCard />
                </div>

                <div className="flex-1 min-w-0 lg:self-center md:h-[80vh]">
                    <UserFileTableCard />
                </div>
            </div>
        </div>
    );
}

export default App;
