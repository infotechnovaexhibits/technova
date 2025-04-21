"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../../components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LogoutPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    // Remove auth token
    localStorage.removeItem('isAuthenticated');

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 2 seconds
    const redirect = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="w-[350px] overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-green-50 p-6 flex flex-col items-center justify-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="rounded-full bg-white p-3 shadow-sm">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Successfully Logged Out
                </h2>
                <p className="text-gray-600">
                  Thank you for using our service
                </p>
              </motion.div>
            </div>
            <div className="px-6 py-4 bg-white border-t border-gray-100">
              <motion.p 
                className="text-sm text-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Redirecting to home in {countdown} seconds...
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
