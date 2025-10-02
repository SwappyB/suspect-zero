import { NextResponse } from 'next/server';
import '@/lib/types/room';

if (!global.gameRooms) {
  global.gameRooms = new Map();
}

export async function POST(request: Request) {
  try {
    const { player1Name } = await request.json();

    // Generate a random 6-character room code
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();

    const room = {
      id: roomId,
      player1: player1Name,
      player2: null,
      gameState: {
        examinedEvidence: [],
        examinedSuspects: [],
        notes: [],
        hintsUsed: 0,
        maxHints: 3,
        playerNames: [player1Name, 'Waiting...'],
        gameStarted: false,
        gameSolved: false,
      },
      createdAt: Date.now(),
    };

    global.gameRooms.set(roomId, room);

    // Clean up old rooms (older than 24 hours)
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    for (const [id, room] of global.gameRooms.entries()) {
      if (room.createdAt < oneDayAgo) {
        global.gameRooms.delete(id);
      }
    }

    return NextResponse.json({ roomId, room });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}

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

  return NextResponse.json({ room });
}
