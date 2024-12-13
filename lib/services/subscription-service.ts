import { dynamoDB, ses } from '../aws-config';
import { Subscription } from '../types/subscription';
import crypto from 'crypto';

const TABLE_NAME = 'subscriptions';
const FROM_EMAIL = process.env.SENDER_EMAIL_ADDRESS;

export class SubscriptionService {
  static async subscribe(email: string, gdprConsent: boolean): Promise<void> {
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');
    const timestamp = new Date().toISOString();

    const subscription: Subscription = {
      email,
      confirmationToken,
      confirmed: false,
      createdAt: timestamp,
      updatedAt: timestamp,
      unsubscribeToken,
      gdprConsent,
    };

    await dynamoDB
      .put({
        TableName: TABLE_NAME,
        Item: subscription,
        ConditionExpression: 'attribute_not_exists(email)',
      })
      .promise();

    await this.sendConfirmationEmail(email, confirmationToken);
  }

  static async confirm(token: string): Promise<void> {
    const result = await dynamoDB
      .scan({
        TableName: TABLE_NAME,
        FilterExpression: 'confirmationToken = :token',
        ExpressionAttributeValues: { ':token': token },
      })
      .promise();

    if (!result.Items || result.Items.length === 0) {
      throw new Error('Invalid confirmation token');
    }

    const subscription = result.Items[0] as Subscription;

    await dynamoDB
      .update({
        TableName: TABLE_NAME,
        Key: { email: subscription.email },
        UpdateExpression: 'SET confirmed = :confirmed, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':confirmed': true,
          ':updatedAt': new Date().toISOString(),
        },
      })
      .promise();
  }

  static async unsubscribe(token: string): Promise<void> {
    const result = await dynamoDB
      .scan({
        TableName: TABLE_NAME,
        FilterExpression: 'unsubscribeToken = :token',
        ExpressionAttributeValues: { ':token': token },
      })
      .promise();

    if (!result.Items || result.Items.length === 0) {
      throw new Error('Invalid unsubscribe token');
    }

    const subscription = result.Items[0] as Subscription;

    await dynamoDB
      .delete({
        TableName: TABLE_NAME,
        Key: { email: subscription.email },
      })
      .promise();
  }

  private static async sendConfirmationEmail(email: string, token: string): Promise<void> {
    const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribe/confirm?token=${token}`;

    const params = {
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: {
          Data: 'Confirm your subscription',
        },
        Body: {
          Html: {
            Data: `
              <h1>Confirm your subscription</h1>
              <p>Thank you for subscribing to our updates! Please click the link below to confirm your subscription:</p>
              <p><a href="${confirmUrl}">Confirm Subscription</a></p>
              <p>If you didn't request this subscription, you can safely ignore this email.</p>
            `,
          },
        },
      },
    };

    await ses.sendEmail(params).promise();
  }
}
