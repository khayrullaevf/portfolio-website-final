"use server"

import { revalidatePath } from "next/cache"
import { requireAdminClient } from "@/lib/actions/require-admin"
import { coerceFormValues, type FieldConfig } from "@/lib/admin/field"

// Allowlist of tables mutable through the generic CRUD actions below.
// Keeps a stray/forged table name from ever reaching a raw Supabase call.
const LIST_TABLES = [
  "social_links",
  "languages",
  "experience",
  "skills",
  "certifications",
  "education",
  "projects",
  "project_gallery",
] as const
export type ListTable = (typeof LIST_TABLES)[number]

const SINGLETON_TABLES = ["personal_info", "about_info", "meta_info"] as const
export type SingletonTable = (typeof SINGLETON_TABLES)[number]

function assertListTable(table: string): asserts table is ListTable {
  if (!LIST_TABLES.includes(table as ListTable)) {
    throw new Error(`Unknown table: ${table}`)
  }
}

function assertSingletonTable(table: string): asserts table is SingletonTable {
  if (!SINGLETON_TABLES.includes(table as SingletonTable)) {
    throw new Error(`Unknown singleton table: ${table}`)
  }
}

export async function createRecord(
  table: ListTable,
  fields: FieldConfig[],
  formData: FormData,
  revalidatePaths: string[],
) {
  assertListTable(table)
  const supabase = await requireAdminClient()
  const values = coerceFormValues(fields, formData)

  const { error } = await supabase.from(table).insert(values)
  if (error) throw new Error(error.message)

  revalidatePaths.forEach((p) => revalidatePath(p))
}

export async function updateRecord(
  table: ListTable,
  id: string,
  fields: FieldConfig[],
  formData: FormData,
  revalidatePaths: string[],
) {
  assertListTable(table)
  const supabase = await requireAdminClient()
  const values = coerceFormValues(fields, formData)

  const { error } = await supabase.from(table).update(values).eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePaths.forEach((p) => revalidatePath(p))
}

export async function deleteRecord(table: ListTable, id: string, revalidatePaths: string[]) {
  assertListTable(table)
  const supabase = await requireAdminClient()

  const { error } = await supabase.from(table).delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePaths.forEach((p) => revalidatePath(p))
}

export async function updateSingleton(
  table: SingletonTable,
  fields: FieldConfig[],
  formData: FormData,
  revalidatePaths: string[],
) {
  assertSingletonTable(table)
  const supabase = await requireAdminClient()
  const values = coerceFormValues(fields, formData)

  const { error } = await supabase.from(table).update(values).eq("id", 1)
  if (error) throw new Error(error.message)

  revalidatePaths.forEach((p) => revalidatePath(p))
}
