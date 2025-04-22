import {JSX} from 'react';
import bg from './assets/images/background.png';
import Navbar from "@/components/navbar";
import UploadCard from "@/components/uploadCard.tsx";
import UserFileTableCard from "@/components/userFileTableCard.tsx";

function App(): JSX.Element {
    return (
        <div
            className="home-background min-h-screen w-full"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <Navbar />

            <div className="flex flex-col lg:flex-row justify-between items-stretch px-6 py-8 gap-6 h-[calc(100vh-80px)]">
                <div className="w-full md:min-w-[320px] lg:self-center md:max-w-sm">
                    <UploadCard />
                </div>

                <div className="flex-1 w-full">
                    <UserFileTableCard />
                </div>
            </div>
        </div>
    );
}

export default App;
