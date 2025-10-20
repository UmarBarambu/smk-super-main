import { io } from "socket.io-client";

const api_url = import.meta.env.VITE_API_URL;

// Connect socket
export const socket = io(api_url, {
  transports: ["websocket"], // force WebSocket for stability
});
