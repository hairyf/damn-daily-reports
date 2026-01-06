import { If } from '@hairy/react-lib'
import { Button, Select, SelectItem } from '@heroui/react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { sourceOptions } from '../../config/options'
import { createSource } from '../../utils/mock-db'

function Page() {
  const navigate = useNavigate()
  const methods = useForm({
    defaultValues: {
      sourceType: '',
      config: {},
    },
  })

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods

  const selectedSourceType = watch('sourceType')

  const onSubmit = async (data: any) => {
    try {
      const { sourceType, ...config } = data
      await createSource({
        type: sourceType,
        name: `${sourceType} source`, // TODO: add name field?
        config,
      })
      navigate('/source')
    }
    catch (error) {
      console.error('Failed to create source:', error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-lg mx-auto w-full">
        <Controller
          name="sourceType"
          control={control}
          rules={{ required: '请选择数据源类型' }}
          render={({ field }) => (
            <Select
              label="Source Type"
              labelPlacement="outside"
              placeholder="Select source type"
              selectedKeys={field.value ? [field.value] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string
                field.onChange(selected || '')
              }}
              isInvalid={!!errors.sourceType}
              errorMessage={errors.sourceType?.message as string}
            >
              {sourceOptions.map((option) => {
                const IconComponent = option.icon
                return (
                  <SelectItem
                    key={option.value}
                    startContent={IconComponent ? <IconComponent size={16} /> : null}
                  >
                    {option.label}
                  </SelectItem>
                )
              })}
            </Select>
          )}
        />

        <If cond={selectedSourceType === 'git'}>
          <SourceGitForm />
        </If>

        <Button type="submit" className="mt-4" color="primary">
          Create
        </Button>
      </form>
    </FormProvider>
  )
}

export default Page
