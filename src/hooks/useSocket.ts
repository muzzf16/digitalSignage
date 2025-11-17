import { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface UseSocketConfig {
  url: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

// Define a type alias for Socket to avoid import conflicts
type SocketType = ReturnType<typeof io>;

export const useSocket = ({ url, onConnect, onDisconnect, onError }: UseSocketConfig) => {
  const [socket, setSocket] = useState<SocketType | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(url, {
      path: process.env.NEXT_PUBLIC_SOCKET_PATH || '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('Socket connected with ID:', newSocket.id);
      setIsConnected(true);
      onConnect?.();
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setIsConnected(false);
      onDisconnect?.();
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      onError?.(error);
    });

    newSocket.on('reconnect_failed', (error) => {
      console.error('Socket reconnection failed:', error);
      onError?.(error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url]);

  const emit = (event: string, data: any) => {
    if (socket && socket.connected) {
      socket.emit(event, data);
    } else {
      console.warn('Socket not connected, event not emitted:', event, data);
    }
  };

  return {
    socket,
    isConnected,
    emit,
  };
};