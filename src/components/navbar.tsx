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

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);

    return (
        <nav>
            <div className="navbar-container">
                {user ? (
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="bg-accent text-accent-foreground">
                                {user.fullName}
                            </MenubarTrigger>
                            <MenubarContent align="end">
                                <MenubarItem
                                    className="text-red-400 focus:bg-red-400 focus:text-white"
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

                        <LoginDrawer open={loginDrawerOpen} setOpen={setLoginDrawerOpen} />
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;