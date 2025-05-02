import {JSX} from 'react';
import bg from './assets/images/background.png';
import bgDark from './assets/images/background-dark.png';
import Navbar from "@/components/navbar";
import {Toaster} from "@/components/ui/sonner.tsx";
import {useTheme} from "@/context/themeProvider.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "@/routes/homePage.tsx";
import AdminPage from "@/routes/adminPage.tsx";
import ProtectedRoute from "@/routes/protectedRoute.tsx";


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

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRole="Admin">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <footer className="text-center text-xs text-white py-4">
                © {new Date().getFullYear()} Spiltech. Tüm hakları saklıdır.
            </footer>
        </div>
    );
}


export default App;
