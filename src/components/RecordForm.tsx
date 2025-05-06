import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "../hook/useAuth";
import { addRecord } from "../lib/firestore";

// 使用 Zod 定義表單驗證結構
const recordSchema = z.object({
    type: z.enum(["overtime", "compensate"]), // 類型：加班或補休
    date: z.string().min(1, "日期為必填"), // 日期：必填字串
    hours: z.number().positive("時數必須為正數"), // 時數：必須為正數
    reason: z.string().min(1, "事由為必填"), // 事由：必填字串
});

// 從 Zod 結構推斷表單資料型別
type RecordFormData = z.infer<typeof recordSchema>;

// 紀錄表單元件
const RecordForm = () => {
    // 使用 useAuth hook 取得使用者資訊
    const { user } = useAuth();
    // 使用 useForm hook 處理表單狀態與驗證
    const {
        register, // 註冊表單欄位
        handleSubmit, // 處理表單提交
        reset, // 重設表單
        formState: { errors }, // 表單錯誤狀態
    } = useForm<RecordFormData>({
        resolver: zodResolver(recordSchema), // 使用 Zod 解析器進行驗證
    });

    // 使用 useMutation hook 處理新增紀錄的非同步操作
    const mutation = useMutation({
        mutationFn: addRecord, // 執行新增紀錄的函式
        onSuccess: () => {
            alert("紀錄新增成功！"); // 成功時顯示提示訊息
            reset(); // 清空表單
        },
        onError: (error) => {
            alert(`新增失敗: ${error.message}`); // 失敗時顯示錯誤訊息
        },
    });

    // 表單提交處理函式
    const onSubmit = (data: RecordFormData) => {
        if (!user) {
            alert("請先登入"); // 若使用者未登入，提示登入
            return;
        }
        // 準備要提交的紀錄資料
        const recordData = {
            ...data, // 展開表單資料
            uid: user.uid, // 加入使用者 ID
        };
        mutation.mutate(recordData); // 執行新增紀錄操作
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div>
                <h1 className="text-xl font-semibold">新增紀錄</h1>
            </div>
            <div>
                <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                >
                    類型
                </label>
                <select
                    id="type"
                    {...register("type")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option value="overtime">加班</option>
                    <option value="compensate">補休</option>
                </select>
                {errors.type && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.type.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                >
                    日期
                </label>
                <input
                    type="date"
                    id="date"
                    {...register("date")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.date && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.date.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="hours"
                    className="block text-sm font-medium text-gray-700"
                >
                    時數
                </label>
                <input
                    type="number"
                    id="hours"
                    step="0.5"
                    {...register("hours", { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.hours && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.hours.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700"
                >
                    事由
                </label>
                <textarea
                    id="reason"
                    {...register("reason")}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.reason && (
                    <p className="mt-2 text-sm text-red-600">
                        {errors.reason.message}
                    </p>
                )}
            </div>

            <div>
                <button
                    type="submit"
                    disabled={mutation.isPending} // 若正在提交則禁用按鈕
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                    {mutation.isPending ? "提交中..." : "提交"}{" "}
                    {/* 根據提交狀態顯示不同文字 */}
                </button>
            </div>
        </form>
    );
};

// 匯出 RecordForm 元件
export default RecordForm;
