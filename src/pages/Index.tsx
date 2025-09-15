import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your projects today.
            </p>
          </div>
          
          <DashboardStats />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-card rounded-lg p-6 shadow-soft">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    Create New Project
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    Invite Team Member
                  </button>
                  <button className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
