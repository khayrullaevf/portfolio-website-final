import { Download } from "lucide-react";
import type { getCredentialsInfo } from "@/lib/data";

/**
 * Replaces the old credentials card.
 *
 * Two things it fixes beyond the restyle: the certificate download was an
 * `opacity-0 group-hover:opacity-100` button — unreachable by keyboard and
 * invisible on touch — and it faked a 500 ms loading state before opening a
 * static PDF. Both are gone; a certificate with a file is a plain download link.
 */
export function CredentialsList({
  credentialsInfo,
}: {
  credentialsInfo: Awaited<ReturnType<typeof getCredentialsInfo>>;
}) {
  const { certifications, education } = credentialsInfo;

  if (certifications.length === 0 && education.length === 0) return null;

  return (
    <div className="space-y-12">
      {education.length > 0 && (
        <div className="grid gap-3 md:grid-cols-[9rem_1fr] md:gap-10">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pt-1">
            Education
          </h3>

          <ul className="divide-y divide-border border-b border-border">
            {education.map((item) => (
              <li key={`${item.degree}-${item.year}`} className="py-4 first:pt-0">
                <p className="leading-snug">{item.degree}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {[item.institution, item.year].filter(Boolean).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {certifications.length > 0 && (
        <div className="grid gap-3 md:grid-cols-[9rem_1fr] md:gap-10">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:pt-1">
            Certificates
          </h3>

          <ul className="divide-y divide-border border-b border-border">
            {certifications.map((item) => (
              <li
                key={`${item.name}-${item.date}`}
                className="flex items-start justify-between gap-4 py-4 first:pt-0"
              >
                <div className="min-w-0">
                  <p className="leading-snug">{item.name}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {[item.issuer, item.date].filter(Boolean).join(" · ")}
                  </p>
                </div>

                {item.pdfPath && (
                  <a
                    href={item.pdfPath}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-sm font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground outline-none transition-colors duration-fast ease-smooth hover:text-sand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <Download className="h-3 w-3" aria-hidden />
                    <span className="sr-only">Download certificate: </span>
                    PDF
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
