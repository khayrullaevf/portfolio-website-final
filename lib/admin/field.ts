export type FieldType = "text" | "textarea" | "number" | "boolean" | "array" | "image" | "hidden"

export interface FieldConfig {
  key: string
  label: string
  type: FieldType
  required?: boolean
  /** Storage folder to upload into, only used when type === "image" */
  folder?: string
}

// Turns raw form values (all strings/booleans from the DOM) into the shape
// the DB column expects, based on field type.
export function coerceFormValues(fields: FieldConfig[], formData: FormData) {
  const result: Record<string, unknown> = {}

  for (const field of fields) {
    if (field.type === "boolean") {
      result[field.key] = formData.get(field.key) === "on"
      continue
    }

    const raw = formData.get(field.key)
    const value = typeof raw === "string" ? raw : ""

    if (field.type === "number") {
      result[field.key] = value === "" ? 0 : Number(value)
    } else if (field.type === "array") {
      result[field.key] = value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    } else {
      result[field.key] = value
    }
  }

  return result
}

// Inverse of coerceFormValues, for pre-filling an edit form from a DB row.
export function fieldValueToString(field: FieldConfig, value: unknown): string {
  if (value === null || value === undefined) return ""
  if (field.type === "array" && Array.isArray(value)) return value.join("\n")
  return String(value)
}
