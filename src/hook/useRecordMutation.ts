import { useMutation } from "@tanstack/react-query";

import { addRecord } from "../lib/firestore";

import { RecordFormData } from "./useRecordForm";

const useRecordMutation=(onSuccess?: () => void)=> {
    return useMutation({
        mutationFn: (data: RecordFormData & { uid: string }) => addRecord(data),
        onSuccess: () => {
            alert("紀錄新增成功！");
            if (onSuccess) onSuccess();
        },
        onError: (error) => {
            alert(`新增失敗: ${error.message}`);
        },
    });
}

export default useRecordMutation;