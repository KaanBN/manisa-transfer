import {JSX} from 'react';
import bg from './assets/images/background.png';
import bgDark from './assets/images/background-dark.png';
import Navbar from "@/components/navbar";
import UploadCard from "@/components/uploadCard.tsx";
import UserFileTableCard from "@/components/userFileTableCard.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import {useTheme} from "@/components/themeProvider.tsx";

function App(): JSX.Element {

    const { theme } = useTheme()

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(${theme === 'dark' ? bgDark : bg})`,
            }}
        >
            <Toaster richColors={true} />
            <Navbar />

            <main className="flex flex-col lg:flex-row justify-between p-6 gap-6 flex-1">
                <div className="lg:self-center">
                    <UploadCard />
                </div>

                <div className="flex-1 min-w-0 lg:self-center">
                    <UserFileTableCard />
                </div>
            </main>

            <footer className="text-center text-xs text-white py-4">
                © {new Date().getFullYear()} Spiltech. Tüm hakları saklıdır.
            </footer>
        </div>
    );
}


export default App;
