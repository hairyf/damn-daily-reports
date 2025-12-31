import { Button, Card, CardBody, Textarea } from '@heroui/react'
import { Icon } from '@iconify/react'

export function ReportEditor() {
  const [hasTodayReport, setHasTodayReport] = useState(false)
  const [reportContent, setReportContent] = useState('')
  const [isUnsaved, setIsUnsaved] = useState(false)
  const [isAutoSaved, setIsAutoSaved] = useState(false)

  const handleGenerateReport = () => {
    setHasTodayReport(true)
    setReportContent('# 今日报告\n\n## 概述\n\n这里是报告内容...')
    setIsUnsaved(false)
    setIsAutoSaved(false)
  }

  const handleSaveReport = () => {
    setIsUnsaved(false)
    setIsAutoSaved(true)
    // 这里应该调用API保存报告
    setTimeout(() => {
      setIsAutoSaved(false)
    }, 2000)
  }

  const handleContentChange = (value: string) => {
    setReportContent(value)
    setIsUnsaved(true)
    setIsAutoSaved(false)
  }

  return (
    <Card className="flex-1">
      <CardBody className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">当天报告</h3>
          {isUnsaved && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-xs text-default-500">未保存</span>
            </div>
          )}
          {isAutoSaved && !isUnsaved && (
            <span className="text-xs text-success">已自动保存</span>
          )}
        </div>

        {!hasTodayReport
          ? (
            // 未生成状态
              <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Icon icon="lucide:file-text" className="w-18 h-18 text-default-400" />
                  <p className="text-default-500 text-center">
                    暂无数据，点击按钮进行生成
                  </p>
                </div>
                <Button
                  color="primary"
                  onPress={handleGenerateReport}
                  radius="full"
                  className="w-30"
                  startContent={<Icon icon="lucide:sparkles" className="w-4 h-4" />}
                >
                  生成
                </Button>
              </div>
            )
          : (
            // 已生成状态 - Markdown编辑器
              <div className="flex flex-col flex-1 gap-4">
                <div className="text-sm text-default-500">
                  {new Date().toISOString().split('T')[0]}
                </div>
                <div className="flex-1">
                  <Textarea
                    value={reportContent}
                    onValueChange={handleContentChange}
                    placeholder="输入Markdown格式的报告内容..."
                    minRows={15}
                    classNames={{
                      base: 'h-full',
                      input: 'h-full font-mono text-sm',
                      inputWrapper: 'h-full',
                    }}
                    radius="sm"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="light"
                    onPress={() => {
                      setHasTodayReport(false)
                      setReportContent('')
                      setIsUnsaved(false)
                      setIsAutoSaved(false)
                    }}
                  >
                    取消
                  </Button>
                  <Button
                    color="primary"
                    onPress={handleSaveReport}
                    isDisabled={!isUnsaved}
                    startContent={<Icon icon="lucide:save" className="w-4 h-4" />}
                  >
                    保存
                  </Button>
                </div>
              </div>
            )}
      </CardBody>
    </Card>
  )
}
