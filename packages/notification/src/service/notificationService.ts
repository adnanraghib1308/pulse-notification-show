import { NotificationDomain } from "../domain/notificationDomain";
import { NotificationData } from "../types/notification";

export class NotificationService {
  private notificationDomain: NotificationDomain;

  constructor(notificationDomain: NotificationDomain) {
    this.notificationDomain = notificationDomain;
  }

  // Client management wrapper methods
  addClient(userId: string, controller: ReadableStreamDefaultController): void {
    try {
      this.notificationDomain.addClient(userId, controller);
      console.log(`Client added: ${userId}`);
    } catch (error) {
      console.error(`Failed to add client ${userId}:`, error);
      throw error;
    }
  }

  removeClient(userId: string): void {
    try {
      this.notificationDomain.removeClient(userId);
      console.log(`Client removed: ${userId}`);
    } catch (error) {
      console.error(`Failed to remove client ${userId}:`, error);
      throw error;
    }
  }

  // Notification sending wrapper methods
  sendNotificationToUser(userId: string, notification: NotificationData): boolean {
    try {
      this.notificationDomain.sendToUser(userId, notification);
      console.log(`Notification sent to user ${userId}:`, notification.title);
      return true;
    } catch (error) {
      console.error(`Failed to send notification to user ${userId}:`, error);
      return false;
    }
  }

  broadcastNotification(notification: NotificationData): boolean {
    try {
      this.notificationDomain.broadcast(notification);
      console.log(`Notification broadcasted:`, notification.title);
      return true;
    } catch (error) {
      console.error(`Failed to broadcast notification:`, error);
      return false;
    }
  }
}