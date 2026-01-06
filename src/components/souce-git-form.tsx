import { Button, Input, Radio, RadioGroup } from '@heroui/react'
import { open } from '@tauri-apps/plugin-dialog'
import { Controller, useFormContext } from 'react-hook-form'

export function SourceGitForm() {
  const { control, setValue, watch, formState: { errors } } = useFormContext()
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
      <label className="text-sm font-medium text-foreground">Location Type</label>
      <Controller
        name="locationType"
        control={control}
        defaultValue="url"
        render={({ field }) => (
          <RadioGroup
            orientation="horizontal"
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value)
              // Clear other field when switching
              if (value === 'url') {
                setValue('gitDir', '')
              }
              else {
                setValue('gitUrl', '')
              }
            }}
          >
            <Radio value="url">URL</Radio>
            <Radio value="dir">Directory</Radio>
          </RadioGroup>
        )}
      />

      {locationType === 'url' && (
        <Controller
          name="gitUrl"
          control={control}
          rules={{
            required: locationType === 'url' ? '请输入 Git URL' : false,
          }}
          render={({ field }) => (
            <Input
              {...field}
              label="Git URL"
              labelPlacement="outside"
              placeholder="Enter your Git URL"
              isInvalid={!!errors.gitUrl}
              errorMessage={errors.gitUrl?.message as string}
            />
          )}
        />
      )}

      {locationType === 'dir' && (
        <Controller
          name="gitDir"
          control={control}
          rules={{
            required: locationType === 'dir' ? '请选择 Git 目录' : false,
          }}
          render={({ field }) => (
            <div className="flex gap-2">
              <Input
                {...field}
                label="Git Directory"
                labelPlacement="outside"
                placeholder="Select directory"
                isReadOnly
                isInvalid={!!errors.gitDir}
                errorMessage={errors.gitDir?.message as string}
                className="flex-1"
              />
              <Button
                type="button"
                onPress={handleOpenDirectory}
                className="mt-7.5"
                color="primary"
                variant="bordered"
              >
                选择目录
              </Button>
            </div>
          )}
        />
      )}

      <Controller
        name="gitBranch"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Git Branch"
            labelPlacement="outside"
            placeholder="Enter your Git Branch"
          />
        )}
      />

      <Controller
        name="gitUsername"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="Git Username"
            labelPlacement="outside"
            placeholder="Enter your Git Username"
          />
        )}
      />
    </div>
  )
}
