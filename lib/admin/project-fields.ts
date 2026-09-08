import type { FieldConfig } from "@/lib/admin/field"

export const projectFields: FieldConfig[] = [
  { key: "slug", label: "Slug (URL, masalan my-project)", type: "text", required: true },
  { key: "title", label: "Sarlavha", type: "text", required: true },
  { key: "category", label: "Kategoriya", type: "text" },
  { key: "short_description", label: "Qisqa tavsif", type: "textarea" },
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
