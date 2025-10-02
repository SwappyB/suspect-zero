import { NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';

export async function GET() {
  try {
    console.log('🧪 Testing Pusher trigger...');

    const result = await pusherServer.trigger('test-channel', 'test-event', {
      message: 'Hello from server!',
      timestamp: Date.now(),
    });

    console.log('✅ Test trigger result:', {
      status: result.status,
      body: await result.text(),
    });

    return NextResponse.json({
      success: true,
      message: 'Pusher test sent. Check your Pusher Debug Console at https://dashboard.pusher.com/',
    });
  } catch (error) {
    console.error('❌ Test failed:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
