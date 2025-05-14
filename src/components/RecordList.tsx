import { zodResolver } from "@hookform/resolvers/zod";
import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Dialog,
    Group,
    Modal,
    NumberInput,
    Select,
    Skeleton,
    Stack,
    Text,
    Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { Clock, NotePencil, PencilSimple, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "../hooks/useAuth";
import useDeleteRecordMutation from "../hooks/useDeleteRecordMutation";
import useRecordsQuery from "../hooks/useRecordQuery";
import { RecordItem } from "../hooks/useRecordQuery";
import useUpdateRecordMutation from "../hooks/useUpdateRecordMutation";

const recordSchema = z.object({
    type: z.enum(["overtime", "compensate"]),
    date: z.string().min(1, "日期為必填"),
    hours: z.number().positive("時數必須為正數"),
    reason: z.string().min(1, "事由為必填"),
});

type RecordFormData = z.infer<typeof recordSchema>;

const RecordList = () => {
    const { data, isLoading, isError } = useRecordsQuery();
    const { role } = useAuth();
    const deleteRecord = useDeleteRecordMutation();
    const updateRecord = useUpdateRecordMutation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<RecordItem | null>(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<RecordFormData>({
        resolver: zodResolver(recordSchema),
    });

    const isEditor = role === "editor";

    const handleDeleteClick = (recordId: string) => {
        setRecordToDelete(recordId);
        setDialogOpen(true);
    };

    const handleEditClick = (record: RecordItem) => {
        setRecordToEdit(record);
        reset({
            type: record.type,
            date: record.date,
            hours: record.hours,
            reason: record.reason,
        });
        setEditModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (recordToDelete) {
            deleteRecord.mutate(recordToDelete);
            setDialogOpen(false);
            setRecordToDelete(null);
        }
    };

    const onSubmitEdit = (data: RecordFormData) => {
        if (recordToEdit) {
            updateRecord.mutate(
                {
                    id: recordToEdit.id,
                    data: {
                        ...data,
                    },
                },
                {
                    onSuccess: () => {
                        setEditModalOpen(false);
                        setRecordToEdit(null);
                    },
                },
            );
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

            {/* 編輯記錄對話框 */}
            <Modal
                opened={editModalOpen}
                onClose={() => {
                    setEditModalOpen(false);
                    setRecordToEdit(null);
                }}
                title="編輯記錄"
                centered
            >
                <form
                    onSubmit={handleSubmit(onSubmitEdit)}
                    className="space-y-4"
                >
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                id="type"
                                label="類型"
                                placeholder="請選擇類型"
                                data={[
                                    { value: "overtime", label: "加班" },
                                    { value: "compensate", label: "補休" },
                                ]}
                                {...field}
                                error={errors.type?.message}
                                mt="xs"
                            />
                        )}
                    />

                    <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                            <DatePickerInput
                                id="date"
                                label="日期"
                                placeholder="請選擇日期"
                                {...field}
                                error={errors.date?.message}
                                mt="xs"
                                className="w-full"
                            />
                        )}
                    />

                    <Controller
                        name="hours"
                        control={control}
                        render={({ field }) => (
                            <NumberInput
                                id="hours"
                                label="時數"
                                placeholder="請輸入時數"
                                step={0.5}
                                min={0.5}
                                decimalScale={1}
                                {...field}
                                error={errors.hours?.message}
                                mt="xs"
                            />
                        )}
                    />

                    <Textarea
                        id="reason"
                        {...register("reason")}
                        rows={3}
                        label="事由"
                        error={errors.reason?.message}
                        className="mt-1 block w-full"
                    />

                    <Group justify="flex-end" mt="md">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setEditModalOpen(false);
                                setRecordToEdit(null);
                            }}
                        >
                            取消
                        </Button>
                        <Button type="submit" loading={updateRecord.isPending}>
                            {updateRecord.isPending ? "更新中..." : "更新"}
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
};

export default RecordList;
