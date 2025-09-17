type Client = {
  userId: string;
  controller: ReadableStreamDefaultController;
};

const clients = new Map<string, Client>();
export class NotificationDomain {

  addClient(userId: string, controller: ReadableStreamDefaultController) {
    clients.set(userId, { userId, controller });
  }

  removeClient(userId: string) {
    clients.delete(userId);
  }

  sendToUser(userId: string, data: any) {
    const client = clients.get(userId);
    if (client) {
      client.controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
    }
  }

  broadcast(data: any) {
    clients.forEach((client) => {
      client.controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
    });
  }
}