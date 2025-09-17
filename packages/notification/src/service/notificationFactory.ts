import { NotificationDomain } from "../domain/notificationDomain";
import { NotificationService } from "./notificationService";

/**
 * NotificationFactory - Simple factory object with get method
 * 
 * This factory:
 * 1. Creates NotificationDomain instance
 * 2. Injects domain into NotificationService
 * 3. Returns configured service ready for use
 */
export const notificationFactory = {
  /**
   * Get method to create notification service with domain dependency
   * 
   * @returns Configured NotificationService instance
   */
  get(): NotificationService {
    const notificationDomain = new NotificationDomain();
    const notificationService = new NotificationService(notificationDomain);
    
    return notificationService;
  }
};
