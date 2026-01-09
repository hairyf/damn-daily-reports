import { If, useWatch, useWhenever } from '@hairy/react-lib'
import { Button, Input, Textarea } from '@heroui/react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { SourceFormGit } from '@/components/souce-form-git'

function Page() {
  const _navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sourceId = searchParams.get('id') || ''
  const [configs, setConfigs] = useState<Record<string, any>>({})
  const form = useForm({
    defaultValues: {
      id: '',
      name: '',
      description: '',
      source: '',
      config: {},
    },
  })

  const source = form.watch('source')
  const config = form.watch('config')

  useWatch(source, (source, oldSource) => {
    setConfigs(prev => ({ ...prev, [oldSource]: config }))
    form.setValue('config', configs[source] || {})
  })

  useWhenever(sourceId, async () => {
    const source = await sql_querySourceById(sourceId)
    if (!source)
      return
    form.setValue('name', source.name)
    form.setValue('description', source.description)
    form.setValue('config', source.config)
    setConfigs(prev => ({ ...prev, [source.type]: source.config }))
  })

  const onSubmit = async (data: any) => {
    if (sourceId)
      await sql_updateSource(data)
    else
      await sql_createSource(data)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-lg mx-auto w-full">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Name</label>
          <Input
            {...form.register('name')}
            labelPlacement="outside"
            placeholder="Enter source name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Description(optional)</label>
          <Textarea
            {...form.register('description')}
            labelPlacement="outside"
            placeholder="Enter source description"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Source</label>
          <Controller
            name="source"
            control={form.control}
            rules={{ required: '请选择数据源类型' }}
            render={({ field }) => (
              <SourceSelect onChange={field.onChange} value={field.value} />
            )}
          />
        </div>

        <If cond={source === 'git'}>
          <SourceFormGit />
        </If>
        <If cond={source === 'clickup'}>
          <SourceFormClickup />
        </If>

        <Button type="submit" className="mt-4" color="primary">
          Create
        </Button>
      </form>
    </FormProvider>
  )
}

export default Page
