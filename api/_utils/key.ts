import { createHmac } from 'crypto';


export function calculatePushKey(id: string): string {
  return createHmac('sha256', process.env.SECRET_USER_UPDATE_MASTER_KEY)
    .update(id)
    .digest('hex')
    .toLowerCase();
}
