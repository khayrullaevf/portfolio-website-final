export type FieldType = "text" | "textarea" | "number" | "boolean" | "array" | "image" | "hidden"

/**
 * How a field renders inside a ResourceCrud list row. Omit to keep the field
 * form-only (it still round-trips through create/edit, it just isn't listed).
 *
 * - `primary`   bold first line; falls back to ResourceCrud's `titleField`
 * - `secondary` muted second line; several of them join with " · "
 * - `meta`      small chip on the third line, prefixed with the field label
 * - `badge`     boolean only; shows the label as a cyan badge when true
 * - `thumb`     image only; 40x40 preview at the left edge of the row
 * - `swatch`    a colour dot, for columns holding a CSS colour
 */
export type FieldListRole = "primary" | "secondary" | "meta" | "badge" | "thumb" | "swatch"

export interface FieldConfig {
  key: string
  label: string
  type: FieldType
  required?: boolean
  /** Storage folder to upload into, only used when type === "image" */
  folder?: string
  /** Where this field shows up in the admin list. Omit to hide it from the list. */
  list?: FieldListRole
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
