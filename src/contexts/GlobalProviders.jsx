'use client';
import { SidebarProviderLandig } from "@/components/NavbarLanding/SidebarContextLandig";
import { SidebarProvider } from "@/components/Navbar/SidebarContext";

export default function GlobalProviders({ children }) {
  return (
    <SidebarProvider>
      <SidebarProviderLandig>
        {children}
      </SidebarProviderLandig>
    </SidebarProvider>
  );
}