import type { LoaderFunction } from "@remix-run/node";
import { notificationFactory } from "notification/factory/notificationFactory";

export const loader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);
  console.log("Request URL:", url.toString());
  const userId = url.searchParams.get("userId");

  console.log("userID::", userId);

  // Create a new ReadableStream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Function to send SSE data
      const notificationService = notificationFactory.get();

      notificationService.addClient(userId as string, controller);

      // Function to clean up resources
      const cleanup = () => {
        try {
          controller.close();
        } catch (error) {
          // Connection already closed
        }
      };

      // Handle client disconnect
      request.signal.addEventListener("abort", () => {
        console.log("Client disconnected (abort signal)");
        cleanup();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
