import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { useDisclosure } from '@overlastic/react'

export function DeleteReportModal() {
  const disclosure = useDisclosure()
  async function onDelete() {
    // TODO: 删除报告

    disclosure.confirm()
  }
  return (
    <Modal isOpen={disclosure.visible} onClose={disclosure.cancel}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">确认删除</ModalHeader>
        <ModalBody>
          <p>确定要删除这条报告吗？此操作无法撤销。</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={disclosure.cancel}>
            取消
          </Button>
          <Button color="danger" onPress={onDelete}>
            删除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
