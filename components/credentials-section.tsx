'use client';
import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Award, Download, Loader2 } from "lucide-react"
import { SkillTag } from "@/components/skill-tag"
import { AnimatedSection } from "@/components/animated-section"
import { getCredentialsInfo } from "@/lib/data"

export function CredentialsSection() {
  const [downloadingCert, setDownloadingCert] = useState<string | null>(null)
  const credentialsInfo = getCredentialsInfo()

  const handleDownloadCertificate = async (cert: any, index: number) => {
    const certId = `cert-${index}`;
    setDownloadingCert(certId);
    
    try {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // PDF faylni download qilish
      const link = document.createElement('a');
      // Sertifikat fayli nomi (cert.pdfPath yoki default path)
      link.href = cert.pdfPath || `/certificates/${cert.name.replace(/\s+/g, '_')}.pdf`;
      link.download = `${cert.name.replace(/\s+/g, '_')}_Certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Certificate download error:', error);
    } finally {
      setDownloadingCert(null);
    }
  };

  return (
    <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <Award className="w-5 h-5 mr-2 text-cyan-400" />
          <h3 className="text-lg font-medium">Credentials</h3>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Professional Certifications */}
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-zinc-200 flex items-center border-b border-zinc-800 pb-2">
                <Award className="w-4 h-4 mr-2 text-cyan-400" />
                Professional Certifications
              </h4>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {credentialsInfo.certifications.map((cert, index) => {
                  const certId = `cert-${index}`;
                  const isDownloading = downloadingCert === certId;
                  
                  return (
                    <div key={index} className="flex items-center justify-between bg-zinc-800/30 p-3 sm:p-4 rounded-lg group hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-start flex-1">
                        {cert.logo && (
                          <div className="relative w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0 bg-zinc-800">
                            <Image
                              src={cert.logo || "/placeholder.svg"}
                              alt={cert.issuer}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h5 className="text-sm font-medium">{cert.name}</h5>
                          <p className="text-xs text-zinc-200">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <Button
                        onClick={() => handleDownloadCertificate(cert, index)}
                        disabled={isDownloading}
                        variant="outline"
                        size="sm"
                        className="ml-3 border-zinc-600 hover:border-cyan-400 hover:bg-zinc-700 text-xs opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            <span className="hidden sm:inline">Downloading...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3 h-3 mr-1" />
                            <span className="hidden sm:inline">Download</span>
                          </>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Education */}
          <AnimatedSection animation="fade-up" delay={200}>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-zinc-200 flex items-center border-b border-zinc-800 pb-2">
                <GraduationCap className="w-4 h-4 mr-2 text-cyan-400" />
                Education
              </h4>
              <div className="space-y-3 sm:space-y-4">
                {credentialsInfo.education.map((edu, index) => (
                  <div key={index} className="flex items-start bg-zinc-800/30 p-2 sm:p-3 rounded-lg">
                    {edu.logo && (
                      <div className="relative w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0 bg-zinc-800">
                        <Image
                          src={edu.logo || "/placeholder.svg"}
                          alt={edu.institution}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-medium">{edu.degree}</h5>
                      <p className="text-xs text-zinc-200">
                        {edu.institution} • {edu.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Skills & Expertise */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-zinc-200 flex items-center border-b border-zinc-800 pb-2">
                <Award className="w-4 h-4 mr-2 text-cyan-400" />
                Skills & Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {credentialsInfo.skills.map((skill, index) => (
                  <SkillTag key={index}>{skill}</SkillTag>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </CardContent>
    </Card>
  )
}