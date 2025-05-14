import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateRecord } from "../lib/firestore";

import { RecordItem } from "./useRecordQuery";

/**
 * @description 使用 useMutation 來更新 Firestore 中的紀錄
 */
const useUpdateRecordMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: Partial<Omit<RecordItem, "id">>;
        }) => updateRecord(id, data),
        onSuccess: () => {
            // 刷新紀錄列表
            queryClient.invalidateQueries({ queryKey: ["records"] });

            showNotification({
                title: "成功",
                message: "紀錄已成功更新！",
                color: "green",
            });
        },
        onError: (error) => {
            showNotification({
                title: "錯誤",
                message: `更新失敗: ${error.message}`,
                color: "red",
            });
        },
    });
};

export default useUpdateRecordMutation;
