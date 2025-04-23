"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "../../../components/ui/card";
import { Loader2, LogOut } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear both localStorage and cookie
    localStorage.removeItem("auth_token");
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Redirect to login page after a short delay
    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <Card className="w-full max-w-md mx-4 border-none shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75"></div>
              <div className="relative rounded-full bg-white p-4 shadow-sm">
                <LogOut className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Signing Out</h2>
              <p className="text-muted-foreground">Please wait while we log you out...</p>
            </div>
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
