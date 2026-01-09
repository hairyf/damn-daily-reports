import { Button, Input } from '@heroui/react'
import { open } from '@tauri-apps/plugin-dialog'
import { Controller, useFormContext } from 'react-hook-form'

export function SourceFormGit() {
  const { control, setValue, watch } = useFormContext()
  const locationType = watch('locationType')

  const handleOpenDirectory = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      })
      if (selected && typeof selected === 'string') {
        setValue('gitDir', selected)
      }
    }
    catch (error) {
      console.error('Failed to open directory dialog:', error)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">Git Directory</label>
      <Controller
        name="config.dir"
        control={control}
        rules={{
          required: locationType === 'dir' ? '请选择 Git 目录' : false,
        }}
        render={({ field }) => (
          <div className="flex gap-2">
            <Input
              {...field}
              labelPlacement="outside"
              placeholder="Select directory"
              isReadOnly
              className="flex-1"
            />
            <Button
              type="button"
              onPress={handleOpenDirectory}
              color="primary"
              variant="bordered"
            >
              选择目录
            </Button>
          </div>
        )}
      />

      <label className="text-sm font-medium text-foreground">Git Branch</label>
      <Controller
        name="config.branch"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            labelPlacement="outside"
            placeholder="Enter your Git Branch"
          />
        )}
      />

      <label className="text-sm font-medium text-foreground">Git Username</label>
      <Controller
        name="config.username"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            labelPlacement="outside"
            placeholder="Enter your Git Username"
          />
        )}
      />
    </div>
  )
}
