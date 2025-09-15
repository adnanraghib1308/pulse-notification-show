import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+12.5%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Orders",
    value: "1,234",
    change: "-2.4%",
    changeType: "negative",
    icon: ShoppingCart,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+5.2%",
    changeType: "positive",
    icon: Activity,
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const ChangeIcon = stat.changeType === "positive" ? TrendingUp : TrendingDown;
        
        return (
          <Card key={stat.title} className="bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="flex items-center text-sm">
                <ChangeIcon 
                  className={`h-3 w-3 mr-1 ${
                    stat.changeType === "positive" ? "text-success" : "text-destructive"
                  }`} 
                />
                <span 
                  className={`${
                    stat.changeType === "positive" ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};