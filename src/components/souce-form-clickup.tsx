import { Input } from '@heroui/react'
import { Controller, useFormContext } from 'react-hook-form'

export function SourceFormClickup() {
  const { control } = useFormContext()

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">API Token</label>
      <Controller
        name="config.apiToken"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            labelPlacement="outside"
            placeholder="Enter your API Token"
          />
        )}
      />
      <label className="text-sm font-medium text-foreground">Team ID</label>
      <Controller
        name="config.teamId"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            labelPlacement="outside"
            placeholder="Enter your Team ID"
          />
        )}
      />
      <label className="text-sm font-medium text-foreground">User ID</label>
      <Controller
        name="config.userId"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            labelPlacement="outside"
            placeholder="Enter your User ID"
          />
        )}
      />
    </div>
  )
}
