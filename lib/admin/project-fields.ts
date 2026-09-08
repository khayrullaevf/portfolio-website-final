import type { FieldConfig } from "@/lib/admin/field"

// Adding a case-study field is only this array plus the matching column in
// 0003_project_case_study.sql — the generic form and list UI pick it up with no
// component changes.
export const projectFields: FieldConfig[] = [
  { key: "slug", label: "Slug (URL, masalan my-project)", type: "text", required: true },
  { key: "title", label: "Sarlavha", type: "text", required: true },
  { key: "featured", label: "Tanlangan ish", type: "boolean", list: "badge" },
  { key: "category", label: "Kategoriya", type: "text" },
  { key: "year", label: "Yil (arxiv ro'yxati uchun, masalan 2024)", type: "text", list: "meta" },
  { key: "short_description", label: "Qisqa tavsif", type: "textarea" },

  // Problem -> Approach -> Tradeoffs -> Impact: what a hiring reader actually
  // wants from a case study, and what `description` + `features` alone could
  // never carry.
  { key: "problem", label: "Muammo (nima hal qilindi va nega)", type: "textarea" },
  { key: "approach", label: "Yondashuv (qanday qurilgan)", type: "array" },
  { key: "tradeoffs", label: "Murosalar (nima tanlandi, nimadan voz kechildi)", type: "array" },
  { key: "impact", label: "Natija (o'lchanadigan ta'sir)", type: "array" },

  { key: "description", label: "To'liq tavsif (har bir paragraf yangi qatorda)", type: "array" },
  { key: "features", label: "Xususiyatlar", type: "array" },
  { key: "technologies", label: "Texnologiyalar", type: "array" },
  { key: "cover_image_url", label: "Muqova rasmi", type: "image", folder: "projects" },
  { key: "thumbnail_image_url", label: "Thumbnail rasmi", type: "image", folder: "projects" },
  { key: "client", label: "Mijoz", type: "text" },
  { key: "timeline", label: "Muddat", type: "text" },
  { key: "role", label: "Rol", type: "text" },
  { key: "live_url", label: "Live URL", type: "text" },
  { key: "github_url", label: "GitHub URL", type: "text" },
  { key: "sort_order", label: "Tartib raqami", type: "number" },
]
