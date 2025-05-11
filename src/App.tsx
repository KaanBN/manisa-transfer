import {JSX, useEffect, useState} from 'react';
import bg from './assets/images/background.png';
import bgDark from './assets/images/background-dark.png';
import bgVideo from './assets/videos/background.mp4';
import Navbar from "@/components/navbar";
import {Toaster} from "@/components/ui/sonner.tsx";
import {useTheme} from "@/context/themeProvider.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "@/routes/homePage.tsx";
import ProtectedRoute from "@/routes/protectedRoute.tsx";
import UserListPage from "@/routes/userListPage.tsx";
import FileListPage from "@/routes/fileListPage.tsx";
import SettingsDialog from "@/components/admin/settingsDialog.tsx";
import {useAuth} from "@/context/authContext.tsx";
import TwoFactorDialog from "@/components/twoFactorDialog.tsx";
import {toast} from "sonner";

function App(): JSX.Element {
    const {theme} = useTheme()
    const {isAuthenticated, isTwoFaDialogOpen, checkTwoFaDialog, login, logout} = useAuth()

    const [settingDialogOpen, setSettingDialogOpen] = useState(false);

    const handleClose = () => {
        setSettingDialogOpen(false);
    }

    useEffect(() => {
        checkTwoFaDialog()
    }, []);
    return (
        <div className="relative flex flex-col min-h-screen overflow-hidden">
            {!isAuthenticated ? (
                <>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-[-2]"
                        src={bgVideo}
                    />
                    <div className="absolute inset-0 bg-[#00000080] z-[-1]" />
                </>

            ) : (
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat z-[-1]"
                    style={{
                        backgroundImage: `url(${theme === 'dark' ? bgDark : bg})`,
                    }}
                />
            )}

            {
                isTwoFaDialogOpen && (() => {
                    return (
                        <TwoFactorDialog
                            open={isTwoFaDialogOpen}
                            onSuccess={function (token: string): void {
                                login(token);
                                toast.success("2FA doğrulandı.");
                            }}
                            onCancel={() => {
                                logout()
                            }}
                        />
                    )
                })()
            }

            <Toaster richColors={true} theme={theme}/>
            <Navbar setOpenDialog={setSettingDialogOpen}/>

            {settingDialogOpen && (
                <SettingsDialog open={settingDialogOpen} onClose={handleClose}/>
            )}

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute requiredRole="Admin">
                            <UserListPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/files"
                    element={
                        <ProtectedRoute requiredRole="Admin">
                            <FileListPage/>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>

            <footer className="text-center text-xs text-white py-4 z-10">
                © {new Date().getFullYear()} Spiltech. Tüm hakları saklıdır.
            </footer>
        </div>
    );
}


export default App;