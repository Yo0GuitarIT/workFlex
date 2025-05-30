import { Button, Group, Modal, Text } from "@mantine/core";

interface DeleteConfirmDialogProps {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmModal = ({
    opened,
    onClose,
    onConfirm,
}: DeleteConfirmDialogProps) => {
    return (
        <Modal
            opened={opened}
            radius="md"
            size="lg"
            title={"確認刪除"}
            withCloseButton = {false}
            onClose={onClose}
        >
            <Text c="dimmed" mb="lg" size="sm">
                確定要刪除這筆紀錄嗎？此操作無法復原。
            </Text>
            <Group justify="flex-end">
                <Button size="xs" variant="outline" onClick={onClose}>
                    取消
                </Button>
                <Button color="red" size="xs" onClick={onConfirm}>
                    刪除
                </Button>
            </Group>
        </Modal>
    );
};

export default DeleteConfirmModal;
