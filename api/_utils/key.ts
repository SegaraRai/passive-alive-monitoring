import { createHmac } from 'crypto';


export function calculatePushKey(id: string): string {
  return createHmac('sha256', process.env.SECRET_UPDATE_KEY)
    .update(id)
    .digest('hex')
    .toLowerCase();
}
