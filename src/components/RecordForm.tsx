import { Button, NumberInput, Select, Textarea } from "@mantine/core";
import { Controller } from "react-hook-form";

import useCreateRecord from "../hook/useCreateRecord";

// 紀錄表單元件
const RecordForm = () => {
    const { register, handleSubmit, control, errors, mutation, onSubmit } =
        useCreateRecord();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <h1 className="text-xl font-semibold">新增紀錄</h1>

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

            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "提交中..." : "提交"}{" "}
            </Button>
        </form>
    );
};

export default RecordForm;
