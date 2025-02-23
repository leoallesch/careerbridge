// pages/index.tsx
import ResumeUploader from "@/components/dashboard/resume-uploader";
import PageWrapper from "@/components/layout/page-wrapper";

export default function Home() {
  return (
    <PageWrapper
      title="Upload a resume to see what we think you will like!"
      pageNavProps={{
        back: { href: "/dashboard", label: "Dashboard" },
        forward: { href: "/dashboard/interests", label: "Interests" },
      }}
    >
      <ResumeUploader />
    </PageWrapper>
  );
}
