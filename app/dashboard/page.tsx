import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "A recruiter snapshot of Bhuvan Prakash — profile, projects, experience, availability, skills, recognition, and contact at a glance.",
  alternates: { canonical: "/dashboard" },
};

export default function DashboardPage() {
  return <DashboardShell />;
}
