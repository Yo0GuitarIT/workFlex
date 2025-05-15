import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteRecord } from "../lib/firestore";

/**
 * @description 使用 useMutation 來刪除 Firestore 中的紀錄
 */
const useDeleteRecordMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (recordId: string) => deleteRecord(recordId),
        onSuccess: () => {
            // 刷新紀錄列表
            queryClient.invalidateQueries({ queryKey: ["records"] });

            showNotification({
                title: "成功",
                message: "紀錄已成功刪除！",
                color: "green",
            });
        },
        onError: (error) => {
            showNotification({
                title: "錯誤",
                message: `刪除失敗: ${error.message}`,
                color: "red",
            });
        },
    });
};

export default useDeleteRecordMutation;
