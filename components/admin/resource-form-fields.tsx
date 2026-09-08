"use client"

import type { FieldConfig } from "@/lib/admin/field"
import { fieldValueToString } from "@/lib/admin/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUploadField } from "@/components/admin/image-upload-field"

export function ResourceFormFields({
  fields,
  values,
}: {
  fields: FieldConfig[]
  values?: Record<string, unknown>
}) {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const current = values?.[field.key]

        if (field.type === "hidden") {
          return (
            <input
              key={field.key}
              type="hidden"
              name={field.key}
              value={fieldValueToString(field, current)}
            />
          )
        }

        if (field.type === "image") {
          return (
            <ImageUploadField
              key={field.key}
              name={field.key}
              label={field.label}
              folder={field.folder ?? "misc"}
              defaultValue={typeof current === "string" ? current : ""}
            />
          )
        }

        if (field.type === "boolean") {
          return (
            <div key={field.key} className="flex items-center gap-2">
              <Checkbox id={field.key} name={field.key} defaultChecked={Boolean(current)} />
              <Label htmlFor={field.key}>{field.label}</Label>
            </div>
          )
        }

        if (field.type === "textarea" || field.type === "array") {
          return (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>
                {field.label}
                {field.type === "array" && " (har biri yangi qatorda)"}
              </Label>
              <Textarea
                id={field.key}
                name={field.key}
                required={field.required}
                defaultValue={fieldValueToString(field, current)}
                rows={field.type === "array" ? 4 : 3}
              />
            </div>
          )
        }

        return (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              name={field.key}
              type={field.type === "number" ? "number" : "text"}
              required={field.required}
              defaultValue={fieldValueToString(field, current)}
            />
          </div>
        )
      })}
    </div>
  )
}
