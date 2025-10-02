import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import '@/lib/types/room';

if (!global.gameRooms) {
  global.gameRooms = new Map();
}

// Sync game state to server and broadcast to other players
export async function POST(request: Request) {
  try {
    const { roomId, gameState } = await request.json();

    const room = global.gameRooms.get(roomId);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Update the room's game state
    room.gameState = gameState;
    global.gameRooms.set(roomId, room);

    // Broadcast the update to all players in the room via Pusher
    try {
      const result = await pusherServer.trigger(`room-${roomId}`, 'state-update', {
        gameState,
      });
      console.log('Pusher state update sent');
    } catch (error) {
      console.error('Pusher state sync error:', error);
    }

    return NextResponse.json({ success: true, gameState });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to sync state' }, { status: 500 });
  }
}

// Get current game state
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return NextResponse.json({ error: 'Room ID required' }, { status: 400 });
  }

  const room = global.gameRooms.get(roomId);

  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  return NextResponse.json({ gameState: room.gameState });
}
