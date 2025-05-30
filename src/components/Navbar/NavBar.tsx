import {
    ActionIcon,
    Button,
    Drawer,
    Stack,
    Text,
    Title,
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
            <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white px-4 shadow-sm">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
                    {/* 左側：應用標題 */}
                    <Text className="text-lg font-bold text-gray-900">
                        WorkFlex 管理系統
                    </Text>

                    {/* 右側：漢堡選單按鈕 */}
                    <ActionIcon
                        onClick={() => setDrawerOpen(true)}
                        variant="subtle"
                        size="lg"
                        className="hover:bg-gray-100"
                    >
                        <ListIcon size={20} />
                    </ActionIcon>
                </div>
            </header>

            {/* 側邊抽屜 */}
            <Drawer
                opened={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title={
                    <Title order={4} className="text-gray-800">
                        選單
                    </Title>
                }
                position="right"
                size="xs"
                padding="md"
            >
                <Stack gap="md">
                    {/* 用戶資訊 */}
                    <div className="rounded-lg bg-gray-50 p-3">
                        <Text size="sm" fw={500} className="text-gray-800">
                            {user.displayName}
                        </Text>
                        <Text size="xs" className="text-gray-600">
                            {role === "editor" ? "編輯者" : "瀏覽者"}
                        </Text>
                    </div>

                    <Divider />

                    {/* 導航按鈕 */}
                    <Stack gap="xs">
                        <Button
                            variant={isActive("/") ? "filled" : "subtle"}
                            leftSection={<HouseIcon size={16} />}
                            onClick={() => handleNavigation("/")}
                            fullWidth
                            justify="start"
                        >
                            儀表板
                        </Button>
                        <Button
                            variant={isActive("/record") ? "filled" : "subtle"}
                            leftSection={<ClipboardTextIcon size={16} />}
                            onClick={() => handleNavigation("/record")}
                            fullWidth
                            justify="start"
                        >
                            紀錄管理
                        </Button>
                    </Stack>

                    <Divider />

                    {/* 登出按鈕 */}
                    <Button
                        variant="outline"
                        color="red"
                        leftSection={<SignOutIcon size={16} />}
                        onClick={handleLogout}
                        fullWidth
                        justify="start"
                    >
                        登出
                    </Button>
                </Stack>
            </Drawer>
        </>
    );
};
export default Navbar;
