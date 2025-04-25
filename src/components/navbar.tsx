import {Button} from "@/components/ui/button.tsx";
import {Menubar} from "@radix-ui/react-menubar";
import {MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "./ui/menubar";
import { useState } from "react";
import LoginDrawer from "@/components/loginDrawer.tsx";
import {ThemeToggle} from "@/components/themeToggle.tsx";

const Navbar: React.FC = () => {
    // const user = useUser();
    const user = false;

    const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);

    return (
        <nav>
            <div className="navbar-container">
                {user ? (
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="bg-accent text-accent-foreground">
                                Kullanıcı Adı
                            </MenubarTrigger>
                            <MenubarContent align={"end"}>
                                <MenubarItem
                                    className={
                                        "text-red-400 focus:bg-red-400 focus:text-white"
                                    }
                                    onClick={() => {
                                        console.log("clicked");
                                    }}
                                >
                                    Çıkış Yap
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                ) : (
                    <>
                        <Button className={"mr-2"} onClick={() => setLoginDrawerOpen(true)}>Giriş Yap</Button>
                        <ThemeToggle />

                        <LoginDrawer open={loginDrawerOpen} setOpen={setLoginDrawerOpen} />
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
