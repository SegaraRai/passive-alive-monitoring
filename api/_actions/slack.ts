import fetch from 'node-fetch';

import { logFetchError } from '../_utils/log';
import { ActionData } from '.';


const postConfig = [
  (actionData: ActionData) => ({
    username: 'PAM bot',
    channel: `#-${actionData.device.id}`,
    attachments: [
      {
        color: actionData.status.type === 'up' ? 'good' : 'danger',
        title: `${actionData.device.name}`,
        text: `<!here> *${actionData.device.name}* is *${actionData.status.type.toUpperCase()}* now!\n(${actionData.status.strDuration}, since ${actionData.status.strSince})`,
      }
    ],
  }),
  (actionData: ActionData) => ({
    username: 'PAM bot',
    channel: `#everything`,
    attachments: [
      {
        color: actionData.status.type === 'up' ? 'good' : 'danger',
        title: `${actionData.device.name}`,
        text: `*${actionData.device.name}* is *${actionData.status.type.toUpperCase()}* now!\n(${actionData.status.strDuration}, since ${actionData.status.strSince})`,
      }
    ],
  }),
];


async function post(config: typeof postConfig[0], actionData: ActionData) {
  const body = config(actionData);

  const response = await fetch(process.env.SECRET_SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    await logFetchError(response);
  }
}


export default async function (actionData: ActionData) {
  await Promise.all(postConfig.map(p => post(p, actionData)));
}
