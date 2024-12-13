import { NextResponse } from 'next/server';
import { SubscriptionService } from '@/lib/services/subscription-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Confirmation token is required' },
        { status: 400 }
      );
    }

    await SubscriptionService.confirm(token);

    return NextResponse.json({
      success: true,
      message: 'Your subscription has been confirmed',
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Confirmation failed' }, { status: 500 });
  }
}
