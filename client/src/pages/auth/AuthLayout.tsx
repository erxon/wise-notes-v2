import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        {children}
      </div>
      <Toaster />
    </>
  );
}
