import { useState } from "react";
import { Bell, Check, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const notifications = [
  {
    id: 1,
    title: "System Update Available",
    message: "A new system update is ready to be installed",
    time: "2 minutes ago",
    type: "info",
    read: false,
  },
  {
    id: 2,
    title: "Database Backup Completed",
    message: "Daily backup completed successfully",
    time: "1 hour ago",
    type: "success",
    read: false,
  },
  {
    id: 3,
    title: "High CPU Usage Alert",
    message: "CPU usage exceeded 80% threshold",
    time: "3 hours ago",
    type: "warning",
    read: true,
  },
  {
    id: 4,
    title: "New User Registration",
    message: "John Doe has registered for an account",
    time: "5 hours ago",
    type: "info",
    read: true,
  },
  {
    id: 5,
    title: "Payment Failed",
    message: "Payment processing failed for invoice #12345",
    time: "1 day ago",
    type: "error",
    read: false,
  },
];

export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="text-xs">
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="h-96">
          <div className="p-0">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-accent/30' : ''
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};