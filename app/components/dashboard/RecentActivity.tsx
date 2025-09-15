import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    user: "John Doe",
    action: "Created new project",
    time: "2 minutes ago",
    avatar: "",
    status: "success",
  },
  {
    id: 2,
    user: "Sarah Smith",
    action: "Updated user profile",
    time: "15 minutes ago",
    avatar: "",
    status: "info",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Completed task #123",
    time: "1 hour ago",
    avatar: "",
    status: "success",
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "Left a comment",
    time: "2 hours ago",
    avatar: "",
    status: "info",
  },
  {
    id: 5,
    user: "Tom Wilson",
    action: "Uploaded new file",
    time: "3 hours ago",
    avatar: "",
    status: "success",
  },
];

export const RecentActivity = () => {
  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                  {activity.user.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {activity.user}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};