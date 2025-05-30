import {
    ActionIcon,
    Button,
    Drawer,
    Stack,
    Text,
    Divider,
} from "@mantine/core";
import {
    ClipboardTextIcon,
    HouseIcon,
    SignOutIcon,
    ListIcon,
} from "@phosphor-icons/react";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import useAuth from "../../hooks/useAuth";
import { auth } from "../../lib/firebase";

const Navbar = () => {
    const { user, role } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login");
        setDrawerOpen(false);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        setDrawerOpen(false);
    };

    // 如果用戶未登錄，則不顯示 Navbar
    if (!user) return null;

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white px-8 shadow-sm">
                <div className="mx-auto flex h-16 items-center justify-between">
                    {/* 左側：應用標題 */}
                    <Text className="text-lg font-bold text-gray-900">
                        WorkFlex 管理系統
                    </Text>

                    {/* 右側：漢堡選單按鈕 */}
                    <ActionIcon
                        className="hover:bg-gray-100"
                        size="lg"
                        variant="subtle"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <ListIcon size={20} />
                    </ActionIcon>
                </div>
            </header>

            {/* 側邊抽屜 */}
            <Drawer
                opened={drawerOpen}
                padding="md"
                position="right"
                size="xs"
                title="選單"
                onClose={() => setDrawerOpen(false)}
            >
                <Stack gap="md">
                    {/* 用戶資訊 */}
                    <div className="rounded-lg bg-gray-50 p-3">
                        <Text className="text-gray-800" fw={500} size="sm">
                            {user.displayName}
                        </Text>
                        <Text className="text-gray-600" size="xs">
                            {role === "editor" ? "編輯者" : "瀏覽者"}
                        </Text>
                    </div>

                    <Divider />

                    {/* 導航按鈕 */}
                    <Stack gap="xs">
                        <Button
                            fullWidth
                            justify="start"
                            leftSection={<HouseIcon size={16} />}
                            variant={isActive("/") ? "filled" : "subtle"}
                            onClick={() => handleNavigation("/")}
                        >
                            儀表板
                        </Button>
                        <Button
                            fullWidth
                            justify="start"
                            leftSection={<ClipboardTextIcon size={16} />}
                            variant={isActive("/record") ? "filled" : "subtle"}
                            onClick={() => handleNavigation("/record")}
                        >
                            紀錄管理
                        </Button>
                    </Stack>

                    <Divider />

                    {/* 登出按鈕 */}
                    <Button
                        fullWidth
                        color="red"
                        justify="start"
                        leftSection={<SignOutIcon size={16} />}
                        variant="outline"
                        onClick={handleLogout}
                    >
                        登出
                    </Button>
                </Stack>
            </Drawer>
        </>
    );
};
export default Navbar;
