import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

import Navbar from "./NavBar";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <AppShell header={{ height: 60 }}>
            <AppShell.Header>
                <Navbar />
            </AppShell.Header>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
};
export default Layout;
