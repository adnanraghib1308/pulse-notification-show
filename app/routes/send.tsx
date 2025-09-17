import type { ActionFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { useState, useEffect } from "react";
import { notificationFactory } from "notification/factory/notificationFactory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export type NotificationData = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
};

export const meta: MetaFunction = () => {
  return [
    { title: "Send Notification - Pulse Notification" },
    { name: "description", content: "Send notifications to specific users" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  
  if (!userId) {
    throw new Response("User ID is required", { status: 400 });
  }
  
  return {
    userId: userId,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  
  if (!userId) {
    return {
      success: false,
      error: "User ID is required",
    };
  }

  const title = formData.get("title") as string;
  const message = formData.get("message") as string;
  const type = formData.get("type") as "info" | "success" | "warning" | "error";

  // Validate required fields
  if (!title || !message || !type) {
    return {
      success: false,
      error: "Title, message, and type are required",
    };
  }

  try {
    // Get notification service instance
    const notificationService = notificationFactory.get();
    
    // Create notification data
    const notificationData: Omit<NotificationData, 'id' | 'time' | 'read'> & { id: number; time: string; read: boolean } = {
      id: Date.now(), // Generate simple ID
      title,
      message,
      type,
      time: new Date().toLocaleTimeString(),
      read: false,
    };

    // Send notification to user
    const result = notificationService.sendNotificationToUser(userId, notificationData);
    
    if (result) {
      return {
        success: true,
        message: `Notification sent successfully to user ${userId}`,
      };
    } else {
      return {
        success: false,
        error: "Failed to send notification",
      };
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    return {
      success: false,
      error: "An error occurred while sending the notification",
    };
  }
};

export default function SendNotification() {
  const { userId } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<"info" | "success" | "warning" | "error">("info");

  const isSubmitting = navigation.state === "submitting";

  // Show toast on successful submission using useEffect
  useEffect(() => {
    if (actionData?.success) {
      toast({
        title: "Success",
        description: actionData.message,
      });
    }
  }, [actionData?.success, actionData?.message, toast]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Send Notification</h1>
          <p className="text-muted-foreground">
            Send a notification to user: <span className="font-mono font-medium">{userId}</span>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notification Details</CardTitle>
            <CardDescription>
              Fill out the form below to send a notification to the specified user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter notification title"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Enter notification message"
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Type Select */}
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  name="type" 
                  value={selectedType} 
                  onValueChange={(value: "info" | "success" | "warning" | "error") => setSelectedType(value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* User ID Display */}
              <div className="space-y-2">
                <Label>Target User</Label>
                <div className="p-3 bg-muted rounded-md">
                  <span className="font-mono text-sm">{userId}</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Notification"}
              </Button>
            </Form>

            {/* Success/Error Messages */}
            {actionData?.success && (
              <Alert className="mt-4 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  {actionData.message}
                </AlertDescription>
              </Alert>
            )}

            {actionData?.error && (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {actionData.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              This is how the notification will appear to the user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-lg bg-muted/30">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  selectedType === "success" ? "bg-green-500" :
                  selectedType === "warning" ? "bg-yellow-500" :
                  selectedType === "error" ? "bg-red-500" : "bg-blue-500"
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Notification
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This will be sent in real-time via SSE
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Target: {userId}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  );
}
