import {
    ActionIcon,
    Badge,
    Card,
    Group,
    Skeleton,
    Stack,
    Text,
} from "@mantine/core";
import { Clock, NotePencil, PencilSimple, Trash } from "@phosphor-icons/react";
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
                                    <>
                                        <ActionIcon
                                            color="blue"
                                            variant="subtle"
                                            onClick={() =>
                                                handleEditClick(record)
                                            }
                                            aria-label="編輯記錄"
                                        >
                                            <PencilSimple size={16} />
                                        </ActionIcon>
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
                                    </>
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

            {/* 刪除確認對話框 */}
            <DeleteConfirmModal
                opened={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                    setRecordToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
            />

            {/* 編輯記錄對話框 */}
            <EditModal
                opened={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setRecordToEdit(null);
                }}
                recordToEdit={recordToEdit}
                updateRecord={updateRecord}
            />
        </>
    );
};

export default RecordList;
