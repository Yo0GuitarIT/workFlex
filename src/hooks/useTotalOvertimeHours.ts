import useRecordsQuery from "./useRecordQuery";

/**
 * 計算用戶的總加班和已休假時數的 hook
 * @returns 加班總時數、已休假時數、可休假時數（剩餘可休假的時數）
 */
const useTotalOvertimeHours = () => {
    const { data: records, isLoading, isError } = useRecordsQuery();

    // 如果記錄仍在載入中，或者有錯誤，則返回默認值
    if (isLoading || isError || !records) {
        return {
            totalOvertimeHours: 0,
            usedLeaveHours: 0,
            availableLeaveHours: 0,
            isLoading,
            isError,
        };
    }

    // 計算加班時數總和
    const totalOvertimeHours = records
        .filter((record) => record.type === "overtime")
        .reduce((sum, record) => sum + record.hours, 0);

    // 計算已休假時數總和
    const usedLeaveHours = records
        .filter((record) => record.type === "compensate")
        .reduce((sum, record) => sum + record.hours, 0);

    // 計算可休假時數（剩餘可休假的時數）
    const availableLeaveHours = totalOvertimeHours - usedLeaveHours;

    return {
        totalOvertimeHours,
        usedLeaveHours,
        availableLeaveHours,
        isLoading,
        isError,
    };
};

export default useTotalOvertimeHours;
