import { 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Calendar, 
  Mail,
  Home,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Users" },
  { icon: FileText, label: "Projects" },
  { icon: Calendar, label: "Schedule" },
  { icon: Mail, label: "Messages" },
  { icon: TrendingUp, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-card border-r h-full">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                item.active
                  ? "bg-gradient-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};