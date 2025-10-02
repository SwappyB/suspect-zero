import Pusher from 'pusher';
import PusherClient from 'pusher-js';

// Server-side Pusher instance
export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID || 'local-app-id',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || 'local-key',
  secret: process.env.PUSHER_SECRET || 'local-secret',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'us2',
  useTLS: true,
});

// Client-side Pusher instance
export const getPusherClient = () => {
  if (typeof window === 'undefined') return null;

  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  console.log('🔑 Client env - Key:', key, 'Cluster:', cluster);

  // Only initialize Pusher if we have real credentials (not the defaults)
  if (!key || key === 'local-key') {
    console.log('Pusher not configured - using polling fallback');
    return null;
  }

  console.log('Pusher initialized with cluster:', cluster);
  const client = new PusherClient(key, {
    cluster: cluster || 'us2',
    forceTLS: true,
  });

  console.log('Pusher client created with key:', key, 'forceTLS: true');
  return client;
};
