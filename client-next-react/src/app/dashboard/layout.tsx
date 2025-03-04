import { AppSidebar } from "@/components/app-sidebar";
//     import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

interface ChilProps {
  children: ReactNode;
}

export default function Page({ children }: ChilProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
