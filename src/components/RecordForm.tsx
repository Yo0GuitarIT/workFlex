import { Button, NumberInput, Select, Textarea } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates"; // Changed from DateInput
import { Controller } from "react-hook-form";

import useCreateRecord from "../hooks/useCreateRecord";

// 紀錄表單元件
const RecordForm = () => {
    const { register, handleSubmit, control, errors, mutation, onSubmit } =
        useCreateRecord();

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-xl font-semibold">新增紀錄</h1>

            <Controller
                control={control}
                name="type"
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
                control={control}
                name="date"
                render={({ field }) => (
                    <DatePickerInput
                        id="date"
                        label="日期"
                        placeholder="請選擇日期"
                        {...field} // Spread field to pass value, onChange, etc.
                        className="w-full" // Maintain full width
                        error={errors.date?.message}
                        mt="xs"
                    />
                )}
            />

            <Controller
                control={control}
                name="hours"
                render={({ field }) => (
                    <NumberInput
                        decimalScale={1}
                        id="hours"
                        label="時數"
                        min={0.5}
                        placeholder="請輸入時數"
                        step={0.5}
                        {...field}
                        error={errors.hours?.message}
                        mt="xs"
                    />
                )}
            />

            <Textarea
                id="reason"
                {...register("reason")}
                className="mt-1 block w-full"
                error={errors.reason?.message}
                label="事由"
                rows={3}
            />

            <Button disabled={mutation.isPending} type="submit">
                {mutation.isPending ? "提交中..." : "提交"}{" "}
            </Button>
        </form>
    );
};

export default RecordForm;
