import { NextResponse } from 'next/server';
import { SubscriptionService } from '@/lib/services/subscription-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unsubscribe token is required' },
        { status: 400 }
      );
    }

    await SubscriptionService.unsubscribe(token);

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed',
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Unsubscribe failed' }, { status: 500 });
  }
}
