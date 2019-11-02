import fetch from 'node-fetch';

import { formatText } from '../_utils/format';
import { logFetchError } from '../_utils/log';
import { ActionData } from '.';


const postConfig = [
  {
    username: 'PAM bot',
    channel: '#-{{device.id}}',
    text: '@here **{{device.id}}** is **{{status.type}}** now!\n({{status.strDuration}}, since {{status.strSince}})',
  },
  {
    username: 'PAM bot',
    channel: '#everything',
    text: '**{{device.id}}** is **{{status.type}}** now!\n({{status.strDuration}}, since {{status.strSince}})',
  },
];


async function post(config: typeof postConfig[0], actionData: ActionData) {
  const response = await fetch(process.env.SECRET_SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      channel: formatText(config.channel, actionData),
      username: formatText(config.username, actionData),
      text: formatText(config.text, actionData),
    }),
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
