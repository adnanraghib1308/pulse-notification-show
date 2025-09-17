import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const meta: MetaFunction = () => {
  return [
    { title: "User Dashboard - Pulse Notification" },
    { name: "description", content: "User-specific dashboard with notification system" },
  ];
};

export default function UserDashboard() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        
        <div className="flex">
          <DashboardSidebar />
          
          <main className="flex-1 p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">User Dashboard</h1>
            </div>
            
            <DashboardStats />
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-card rounded-lg p-6 shadow-soft">
                  <h3 className="font-semibold mb-4">User Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      View User Profile
                    </button>
                    <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      Send Notification
                    </button>
                    <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      Generate User Report
                    </button>
                  </div>
                </div>

                {/* User-specific information */}
                <div className="bg-gradient-card rounded-lg p-6 shadow-soft">
                  <h3 className="font-semibold mb-4">User Info</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}
