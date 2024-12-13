import { NextResponse } from 'next/server';
import { SubscriptionService } from '@/lib/services/subscription-service';
import { SubscriptionRequest } from '@/lib/types/subscription';

export async function POST(request: Request) {
  try {
    const body: SubscriptionRequest = await request.json();

    if (!body.email || !body.gdprConsent) {
      return NextResponse.json(
        { success: false, message: 'Email and GDPR consent are required' },
        { status: 400 }
      );
    }

    await SubscriptionService.subscribe(body.email, body.gdprConsent);

    return NextResponse.json({
      success: true,
      message: 'Please check your email to confirm your subscription',
    });
  } catch (error: any) {
    if (error.code === 'ConditionalCheckFailedException') {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: false, message: 'Subscription failed' }, { status: 500 });
  }
}
