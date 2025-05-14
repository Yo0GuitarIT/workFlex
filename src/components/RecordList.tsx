import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Dialog,
    Group,
    Skeleton,
    Stack,
    Text,
} from "@mantine/core";
import { Clock, NotePencil, Trash } from "@phosphor-icons/react";
import { useState } from "react";

import useAuth from "../hook/useAuth";
import useDeleteRecordMutation from "../hook/useDeleteRecordMutation";
import useRecordsQuery from "../hook/useRecordQuery";

const RecordList = () => {
    const { data, isLoading, isError } = useRecordsQuery();
    const { role } = useAuth();
    const deleteRecord = useDeleteRecordMutation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

    const isEditor = role === "editor";

    const handleDeleteClick = (recordId: string) => {
        setRecordToDelete(recordId);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (recordToDelete) {
            deleteRecord.mutate(recordToDelete);
            setDialogOpen(false);
            setRecordToDelete(null);
        }
    };

    if (isLoading) return <Skeleton height={80} mt={"md"} radius={"md"} />;
    if (isError) return <Text c="red">載入紀錄失敗，請稍後再試。</Text>;
    if (!data || data.length === 0)
        return <Text c="dimmed">目前沒有任何紀錄。</Text>;
    return (
        <>
            <Stack mt="xl" gap="md">
                {data.map((record) => (
                    <Card key={record.id} shadow="sm" radius="md" withBorder>
                        <Group justify="space-between" align="flex-start">
                            <Badge
                                color={
                                    record.type === "overtime"
                                        ? "blue"
                                        : "green"
                                }
                                variant="light"
                            >
                                {record.type === "overtime" ? "加班" : "補休"}
                            </Badge>
                            <Group>
                                <Text size="xs" c="dimmed">
                                    {record.date}
                                </Text>
                                {isEditor && (
                                    <ActionIcon
                                        color="red"
                                        variant="subtle"
                                        onClick={() =>
                                            handleDeleteClick(record.id)
                                        }
                                        aria-label="刪除記錄"
                                    >
                                        <Trash size={16} />
                                    </ActionIcon>
                                )}
                            </Group>
                        </Group>

                        <Group align="center" mt="xs">
                            <Clock size={16} />
                            <Text size="sm">時數：{record.hours} 小時</Text>
                        </Group>

                        <Group align="center" mt="xs">
                            <NotePencil size={16} />
                            <Text size="sm" c="gray">
                                {record.reason}
                            </Text>
                        </Group>
                    </Card>
                ))}
            </Stack>

            <Dialog
                opened={dialogOpen}
                withCloseButton
                onClose={() => {
                    setDialogOpen(false);
                    setRecordToDelete(null);
                }}
                size="lg"
                radius="md"
                position={{ top: 20, right: 20 }}
            >
                <Text size="sm" mb="xs" fw={500}>
                    確認刪除
                </Text>
                <Text size="sm" c="dimmed" mb="lg">
                    確定要刪除這筆紀錄嗎？此操作無法復原。
                </Text>
                <Group justify="flex-end">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setDialogOpen(false);
                            setRecordToDelete(null);
                        }}
                        size="xs"
                    >
                        取消
                    </Button>
                    <Button color="red" onClick={handleConfirmDelete} size="xs">
                        刪除
                    </Button>
                </Group>
            </Dialog>
        </>
    );
};

export default RecordList;
