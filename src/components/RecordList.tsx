import {
    ActionIcon,
    Badge,
    Card,
    Group,
    Skeleton,
    Stack,
    Text,
} from "@mantine/core";
import {
    ClockIcon,
    NotePencilIcon,
    PencilSimpleIcon,
    TrashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

import useAuth from "../hooks/useAuth";
import useDeleteRecordMutation from "../hooks/useDeleteRecordMutation";
import useRecordsQuery from "../hooks/useRecordQuery";
import { RecordItem } from "../hooks/useRecordQuery";
import useUpdateRecordMutation from "../hooks/useUpdateRecordMutation";

import DeleteConfirmModal from "./DeleteConfirmModal";
import EditModal from "./EditModal";

const RecordList = () => {
    const { data, isLoading, isError } = useRecordsQuery();
    const { role } = useAuth();
    const deleteRecord = useDeleteRecordMutation();
    const updateRecord = useUpdateRecordMutation();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<RecordItem | null>(null);

    const isEditor = role === "editor";

    const handleDeleteClick = (recordId: string) => {
        setRecordToDelete(recordId);
        setDeleteModalOpen(true);
    };

    const handleEditClick = (record: RecordItem) => {
        setRecordToEdit(record);
        setEditModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (recordToDelete) {
            deleteRecord.mutate(recordToDelete);
            setDeleteModalOpen(false);
            setRecordToDelete(null);
        }
    };

    if (isLoading) return <Skeleton height={80} mt={"md"} radius={"md"} />;
    if (isError) return <Text c="red">載入紀錄失敗，請稍後再試。</Text>;
    if (!data || data.length === 0)
        return <Text c="dimmed">目前沒有任何紀錄。</Text>;
    return (
        <>
            <Stack gap="md" mt="xl">
                {data.map((record) => (
                    <Card key={record.id} withBorder radius="md" shadow="sm">
                        <Group align="flex-start" justify="space-between">
                            <Badge
                                variant="light"
                                color={
                                    record.type === "overtime"
                                        ? "blue"
                                        : "green"
                                }
                            >
                                {record.type === "overtime" ? "加班" : "補休"}
                            </Badge>
                            <Group>
                                <Text c="dimmed" size="xs">
                                    {record.date}
                                </Text>
                                {isEditor && (
                                    <>
                                        <ActionIcon
                                            aria-label="編輯記錄"
                                            color="blue"
                                            variant="subtle"
                                            onClick={() =>
                                                handleEditClick(record)
                                            }
                                        >
                                            <PencilSimpleIcon size={16} />
                                        </ActionIcon>
                                        <ActionIcon
                                            aria-label="刪除記錄"
                                            color="red"
                                            variant="subtle"
                                            onClick={() =>
                                                handleDeleteClick(record.id)
                                            }
                                        >
                                            <TrashIcon size={16} />
                                        </ActionIcon>
                                    </>
                                )}
                            </Group>
                        </Group>

                        <Group align="center" mt="xs">
                            <ClockIcon size={16} />
                            <Text size="sm">時數：{record.hours} 小時</Text>
                        </Group>

                        <Group align="center" mt="xs">
                            <NotePencilIcon size={16} />
                            <Text c="gray" size="sm">
                                {record.reason}
                            </Text>
                        </Group>
                    </Card>
                ))}
            </Stack>

            {/* 刪除確認對話框 */}
            <DeleteConfirmModal
                opened={deleteModalOpen}
                onConfirm={handleConfirmDelete}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setRecordToDelete(null);
                }}
            />

            {/* 編輯記錄對話框 */}
            <EditModal
                opened={editModalOpen}
                recordToEdit={recordToEdit}
                updateRecord={updateRecord}
                onClose={() => {
                    setEditModalOpen(false);
                    setRecordToEdit(null);
                }}
            />
        </>
    );
};

export default RecordList;
