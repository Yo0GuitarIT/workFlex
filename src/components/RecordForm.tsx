import { Button, Textarea } from "@mantine/core";

import useCreateRecord from "../hook/useCreateRecord";

// 紀錄表單元件
const RecordForm = () => {
    const { register, handleSubmit, errors, mutation, onSubmit } =
        useCreateRecord();

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
                <Textarea
                    id="reason"
                    {...register("reason")}
                    rows={3}
                    label="事由"
                    error={errors.reason?.message}
                    className="mt-1 block w-full"
                />
            </div>

            <div>
                <Button
                    type="submit"
                    disabled={mutation.isPending} // 若正在提交則禁用按鈕
                >
                    {mutation.isPending ? "提交中..." : "提交"}{" "}
                    {/* 根據提交狀態顯示不同文字 */}
                </Button>
            </div>
        </form>
    );
};

export default RecordForm;
