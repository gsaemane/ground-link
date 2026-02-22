import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"; // if you added sidebar component
import AdminSidebar from "@/components/admin/AdminSidebar"; // you'll create this

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <SidebarProvider>
          <AdminSidebar />
          <main className="flex-1">
            <header className="border-b sticky top-0 bg-background z-30">
              <div className="flex h-16 items-center px-6">
                <SidebarTrigger />
                <div className="ml-4 font-semibold">Admin Dashboard</div>
              </div>
            </header>
            <div className="p-6">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}