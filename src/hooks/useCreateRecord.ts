import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "./useAuth";
import useRecordMutation from "./useRecordMutation";

const recordSchema = z.object({
    type: z.enum(["overtime", "compensate"]), // 類型：加班或補休
    date: z.string().min(1, "日期為必填"), // 日期：必填字串
    hours: z.number().positive("時數必須為正數"), // 時數：必須為正數
    reason: z.string().min(1, "事由為必填"), // 事由：必填字串
});

export type RecordFormData = z.infer<typeof recordSchema>; // 從 Zod 結構推斷表單資料型別

/**
 * @description 使用 useForm 來處理新增紀錄的表單
 */
const useCreateRecord = () => {
    const { user } = useAuth();
    const mutation = useRecordMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<RecordFormData>({
        resolver: zodResolver(recordSchema), // 使用 Zod 解析器進行驗證
        defaultValues: {
            type: "overtime",
            hours: 1, // 預設時數
        },
    });

    const onSubmit = (data: RecordFormData) => {
        if (!user) return;

        // 準備要提交的紀錄資料
        const recordData = {
            ...data, // 展開表單資料
            uid: user.uid, // 加入使用者 ID
        };
        mutation.mutate(recordData, {
            onSuccess: () => {
                reset();
            },
        }); // 執行新增紀錄操作
    };
    return {
        register,
        handleSubmit,
        control,
        errors,
        mutation,
        onSubmit,
    };
};

export default useCreateRecord;
