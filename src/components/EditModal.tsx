import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Group,
    Modal,
    NumberInput,
    Select,
    Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { RecordItem } from "../hooks/useRecordQuery";

interface RecordFormData {
    type: "overtime" | "compensate";
    date: string;
    hours: number;
    reason: string;
}

const recordSchema = z.object({
    type: z.enum(["overtime", "compensate"]),
    date: z.string().min(1, "日期為必填"),
    hours: z.number().positive("時數必須為正數"),
    reason: z.string().min(1, "事由為必填"),
});

interface EditModalProps {
    opened: boolean;
    onClose: () => void;
    recordToEdit: RecordItem | null;
    updateRecord: {
        mutate: (
            args: {
                id: string;
                data: RecordFormData;
            },
            options: { onSuccess: () => void },
        ) => void;
        isPending: boolean;
    };
}

const EditModal = ({
    opened,
    onClose,
    recordToEdit,
    updateRecord,
}: EditModalProps) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<RecordFormData>({
        resolver: zodResolver(recordSchema),
        defaultValues: recordToEdit
            ? {
                  type: recordToEdit.type,
                  date: recordToEdit.date,
                  hours: recordToEdit.hours,
                  reason: recordToEdit.reason,
              }
            : undefined,
    });

    // 每當 recordToEdit 改變時，重置表單數據
    useEffect(() => {
        if (recordToEdit) {
            reset({
                type: recordToEdit.type,
                date: recordToEdit.date,
                hours: recordToEdit.hours,
                reason: recordToEdit.reason,
            });
        }
    }, [recordToEdit, reset]);

    // 內部處理提交邏輯
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
                        onClose(); // 關閉對話框
                    },
                },
            );
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="編輯記錄" centered>
            <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
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
                    <Button variant="outline" onClick={onClose}>
                        取消
                    </Button>
                    <Button type="submit" loading={updateRecord.isPending}>
                        {updateRecord.isPending ? "更新中..." : "更新"}
                    </Button>
                </Group>
            </form>
        </Modal>
    );
};

export default EditModal;
