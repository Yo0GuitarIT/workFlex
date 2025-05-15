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
            withCloseButton
            onClose={onClose}
            size="lg"
            radius="md"
        >
            <Text size="sm" mb="xs" fw={500}>
                確認刪除
            </Text>
            <Text size="sm" c="dimmed" mb="lg">
                確定要刪除這筆紀錄嗎？此操作無法復原。
            </Text>
            <Group justify="flex-end">
                <Button variant="outline" onClick={onClose} size="xs">
                    取消
                </Button>
                <Button color="red" onClick={onConfirm} size="xs">
                    刪除
                </Button>
            </Group>
        </Modal>
    );
};

export default DeleteConfirmModal;
