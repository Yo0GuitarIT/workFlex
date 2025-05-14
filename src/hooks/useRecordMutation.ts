import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addRecord } from "../lib/firestore";

import { RecordFormData } from "./useCreateRecord";

/**
 * @description 使用 useMutation 來新增 Firestore 中的紀錄
 */
const useRecordMutation = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: RecordFormData & { uid: string }) => addRecord(data),
        onSuccess: () => {
            // 刷新紀錄列表
            queryClient.invalidateQueries({ queryKey: ["records"] });

            showNotification({
                title: "成功",
                message: "紀錄新增成功！",
                color: "green", // 設定通知顏色
            });
            if (onSuccess) onSuccess();
        },
        onError: (error) => {
            showNotification({
                title: "錯誤",
                message: `新增失敗: ${error.message}`,
                color: "red", // 設定通知顏色
            });
        },
    });
};

export default useRecordMutation;
