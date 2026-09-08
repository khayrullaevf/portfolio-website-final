"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { requireAdminClient } from "@/lib/actions/require-admin"
import { META_INFO_TAG } from "@/lib/data"
import { coerceFormValues, type FieldConfig } from "@/lib/admin/field"

/**
 * Actions return this instead of throwing: a thrown Server Action error is
 * redacted to a generic string in production, so the admin UI could never show
 * the user what actually went wrong (a null constraint, a duplicate slug…).
 */
export type ActionResult = { ok: true } | { ok: false; message: string }

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

function fail(error: unknown): ActionResult {
  const message = error instanceof Error ? error.message : String(error)
  return { ok: false, message }
}

export async function createRecord(
  table: ListTable,
  fields: FieldConfig[],
  formData: FormData,
  revalidatePaths: string[],
): Promise<ActionResult> {
  try {
    assertListTable(table)
    const supabase = await requireAdminClient()
    const values = coerceFormValues(fields, formData)

    const { error } = await supabase.from(table).insert(values)
    if (error) return { ok: false, message: error.message }

    revalidatePaths.forEach((p) => revalidatePath(p))
    return { ok: true }
  } catch (error) {
    return fail(error)
  }
}

export async function updateRecord(
  table: ListTable,
  id: string,
  fields: FieldConfig[],
  formData: FormData,
  revalidatePaths: string[],
): Promise<ActionResult> {
  try {
    assertListTable(table)
    const supabase = await requireAdminClient()
    const values = coerceFormValues(fields, formData)

    const { error } = await supabase.from(table).update(values).eq("id", id)
    if (error) return { ok: false, message: error.message }

    revalidatePaths.forEach((p) => revalidatePath(p))
    return { ok: true }
  } catch (error) {
    return fail(error)
  }
}

export async function deleteRecord(
  table: ListTable,
  id: string,
  revalidatePaths: string[],
): Promise<ActionResult> {
  try {
    assertListTable(table)
    const supabase = await requireAdminClient()

    const { error } = await supabase.from(table).delete().eq("id", id)
    if (error) return { ok: false, message: error.message }

    revalidatePaths.forEach((p) => revalidatePath(p))
    return { ok: true }
  } catch (error) {
    return fail(error)
  }
}

export async function updateSingleton(
  table: SingletonTable,
  fields: FieldConfig[],
  formData: FormData,
  revalidatePaths: string[],
): Promise<ActionResult> {
  try {
    assertSingletonTable(table)
    const supabase = await requireAdminClient()
    const values = coerceFormValues(fields, formData)

    const { error } = await supabase.from(table).update(values).eq("id", 1)
    if (error) return { ok: false, message: error.message }

    revalidatePaths.forEach((p) => revalidatePath(p))
    // getMetaInfo is unstable_cache'd, so a path revalidation alone would not
    // pick up a SEO edit.
    if (table === "meta_info") revalidateTag(META_INFO_TAG)
    return { ok: true }
  } catch (error) {
    return fail(error)
  }
}
