// app/(admin)/layout.tsx

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar'; // your sidebar component
import { Toaster } from '@/components/ui/sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        <SidebarProvider>
          <div className="flex h-screen w-full overflow-hidden">
            {/* Fixed sidebar */}
            <AdminSidebar />

            {/* Main content – full remaining width */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Sticky header */}
              <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-30">
                <div className="flex h-14 lg:h-16 items-center px-4 lg:px-8">
                  <SidebarTrigger />
                  <div className="ml-4 font-semibold text-lg">Ground Link Admin</div>
                </div>
              </header>

              {/* Full-width page content */}
              <main className="flex-1 overflow-auto w-full p-4 lg:p-8">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>

  );
}