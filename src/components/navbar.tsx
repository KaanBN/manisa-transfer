import { Button } from "@/components/ui/button.tsx";
import { Menubar } from "@radix-ui/react-menubar";
import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
} from "./ui/menubar";
import { useState } from "react";
import LoginDrawer from "@/components/loginDrawer.tsx";
import { ThemeToggle } from "@/components/themeToggle.tsx";
import {useAuth} from "@/context/authContext.tsx";
import {useLocation, useNavigate} from "react-router-dom";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);

    return (
        <nav>
            <div className="navbar-container">
                {
                    user?.role === "Admin" && (
                        <Button className="mr-auto" onClick={() => {
                            location.pathname === "/admin" ? (navigate("/")) : (navigate("/admin"))
                        }}>
                            {
                                location.pathname === "/admin" ? ("Panelden çık") : ("Panele Git")
                            }
                        </Button>
                    )
                }
                {user ? (
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="bg-accent text-accent-foreground cursor-pointer">
                                {user.fullName}
                            </MenubarTrigger>
                            <MenubarContent align="end">
                                <MenubarItem
                                    className="text-red-400 focus:bg-red-400 focus:text-white cursor-pointer transition duration-150 "
                                    onClick={logout}
                                >
                                    Çıkış Yap
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                ) : (
                    <>
                        <Button className="mr-2" onClick={() => setLoginDrawerOpen(true)}>
                            Giriş Yap
                        </Button>

                        <LoginDrawer open={loginDrawerOpen} setOpen={setLoginDrawerOpen}/>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;