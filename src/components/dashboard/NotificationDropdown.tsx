import { useEffect, useState } from "react";
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
import { NotificationData } from "notification/types/notification";
import { useSearchParams } from "@remix-run/react";


export const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationList, setNotificationList] = useState<NotificationData[]>([]);
  const [isSSEConnected, setIsSSEConnected] = useState(false);
  const [sseError, setSseError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const unreadNotificationCount = notificationList.filter(n => !n.read).length;

  // Function to mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Function to mark a single notification as read
  const markNotificationAsRead = (id: number) => {
    setNotificationList(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // SSE subscription effect
  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connectSSE = () => {
      try {
        console.log('Connecting to SSE...');
        eventSource = new EventSource(`/sse?userId=${userId}`);

        eventSource.onopen = () => {
          console.log('SSE connection opened');
          setIsSSEConnected(true);
          setSseError(null);
        };

        eventSource.onmessage = (event) => {
          try {
            const notificationData: NotificationData = JSON.parse(event.data);
            console.log('Received notification data:', notificationData);
            
            // Add the notification directly to the list
            setNotificationList(prev => [notificationData, ...prev].slice(0, 10)); // Keep only last 10 notifications
          } catch (err) {
            console.error('Error parsing notification data:', err);
          }
        };

        eventSource.onerror = (event) => {
          console.error('SSE error:', event);
          setIsSSEConnected(false);
          setSseError('Connection error occurred');
        };

      } catch (err) {
        console.error('Failed to create SSE connection:', err);
        setSseError('Failed to establish connection');
      }
    };

    connectSSE();

    // Cleanup function
    return () => {
      if (eventSource) {
        console.log('Closing SSE connection');
        eventSource.close();
        setIsSSEConnected(false);
      }
    };
  }, []);

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
          {unreadNotificationCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadNotificationCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Live Notifications</h3>
            <div className="flex items-center gap-2">
              {/* SSE Connection Status */}
              <div className="flex items-center gap-1">
                <div 
                  className={`w-2 h-2 rounded-full ${
                    isSSEConnected ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-xs text-muted-foreground">
                  {isSSEConnected ? 'Live' : 'Offline'}
                </span>
              </div>
              {unreadNotificationCount > 0 && (
                <Button variant="ghost" size="sm" className="text-xs" onClick={markAllNotificationsAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
          </div>
          {sseError && (
            <p className="text-xs text-destructive mt-1">{sseError}</p>
          )}
        </div>
        
        <ScrollArea className="h-96">
          <div className="p-0">
            {notificationList.length === 0 ? (
              <div className="p-8 text-center">
                <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No notifications yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isSSEConnected ? 'Waiting for live updates...' : 'Connecting to live feed...'}
                </p>
              </div>
            ) : (
              notificationList.map((notification, index) => (
                <div key={notification.id}>
                  <div 
                    className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-accent/30' : ''
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
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
                  {index < notificationList.length - 1 && <Separator />}
                </div>
              ))
            )}
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