import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

import { addRecord } from "../lib/firestore";

import { RecordFormData } from "./useRecordForm";

const useRecordMutation=(onSuccess?: () => void)=> {
    return useMutation({
        mutationFn: (data: RecordFormData & { uid: string }) => addRecord(data),
        onSuccess: () => {
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
}

export default useRecordMutation;