import { Card, Group, Skeleton, Text, Badge } from "@mantine/core";
import { Clock, CalendarCheck, CalendarX } from "@phosphor-icons/react";

import useTotalOvertimeHours from "../hooks/useTotalOvertimeHours";


/**
 * 加班時數概要組件
 * 顯示加班總時數、已休假時數、可休假時數
 */
const OvertimeSummary = () => {
    const {
        totalOvertimeHours,
        usedLeaveHours,
        availableLeaveHours,
        isLoading,
        isError,
    } = useTotalOvertimeHours();

    if (isLoading) return <Skeleton height={160} radius="md" />;
    if (isError) return <Text c="red">載入時數統計失敗，請稍後再試。</Text>;

    return (
        <Card withBorder p="lg" radius="md" shadow="sm">
            <Text fw={700} mb="md" size="lg">
                加班時數統計
            </Text>

            <Group mb="xs">
                <Clock size={20} weight="duotone" />
                <Text>加班總時數：{totalOvertimeHours} 小時</Text>
            </Group>

            <Group mb="xs">
                <CalendarCheck size={20} weight="duotone" />
                <Text>已休假時數：{usedLeaveHours} 小時</Text>
            </Group>

            <Group>
                <CalendarX size={20} weight="duotone" />
                <Text>
                    可休假時數：
                    <Badge
                        size="lg"
                        color={
                            availableLeaveHours > 0
                                ? "green"
                                : availableLeaveHours < 0
                                  ? "red"
                                  : "gray"
                        }
                    >
                        {availableLeaveHours} 小時
                    </Badge>
                </Text>
            </Group>
        </Card>
    );
};

export default OvertimeSummary;
