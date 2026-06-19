"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { ScrollProgressProvider } from "@/components/layout/ScrollProgress";
import { Analytics } from "@/components/layout/Analytics";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <ScrollProgressProvider>
      <Header onOpenCommandPalette={() => setCommandOpen(true)} />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <main>{children}</main>
      <Footer />
      <Analytics />
    </ScrollProgressProvider>
  );
}
