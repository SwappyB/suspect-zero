import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import '@/lib/types/room';

if (!global.gameRooms) {
  global.gameRooms = new Map();
}

export async function POST(request: Request) {
  try {
    const { roomId, player2Name } = await request.json();

    const room = global.gameRooms.get(roomId);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (room.player2) {
      return NextResponse.json({ error: 'Room is full' }, { status: 400 });
    }

    // Add player 2 to the room
    room.player2 = player2Name;
    room.gameState.playerNames[1] = player2Name;
    room.gameState.gameStarted = true;

    global.gameRooms.set(roomId, room);

    // Notify player 1 via Pusher
    try {
      const channelName = `room-${roomId}`;
      const eventName = 'player-joined';

      console.log(`🚀 Server Pusher config:`, {
        appId: process.env.PUSHER_APP_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_KEY,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      });
      console.log(`📤 Triggering '${eventName}' on '${channelName}'`);
      console.log('Event data:', { player2: player2Name, gameState: room.gameState });

      const result = await pusherServer.trigger(channelName, eventName, {
        player2: player2Name,
        gameState: room.gameState,
      });

      const resultBody = await result.text();
      console.log('✅ Pusher trigger result:', {
        status: result.status,
        body: resultBody,
      });
    } catch (error) {
      console.error('❌ Pusher error:', error);
      console.log('Pusher notification failed - using polling fallback');
    }

    return NextResponse.json({ room });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to join room' }, { status: 500 });
  }
}
