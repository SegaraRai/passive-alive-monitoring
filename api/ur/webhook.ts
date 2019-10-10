import { NowRequest, NowResponse } from '@now/node';
import fetch from 'node-fetch';


function buildText(template: string, query: any): string {
  return template
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\')
    .replace(/#([^#]*)#/g, (_, key) => key ? String(query[key]) : '#');
}


export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('405');
    return;
  }

  if (req.body.key !== process.env.SECRET_PUSH_KEY) {
    res.status(403).send('403');
    return;
  }

  const push7ApiUrl = `https://api.push7.jp/api/v1/${process.env.SECRET_PUSH7_APPID}/send`;

  const body = {
    title: buildText(process.env.SECRET_NOTIFICATION_TITLE!, req.query),
    body: buildText(process.env.SECRET_NOTIFICATION_BODY!, req.query),
    icon: process.env.SECRET_NOTIFICATION_ICON!,
    url: process.env.SECRET_NOTIFICATION_URL!,
    disappear_instantly: true,
  };

  const response = await fetch(push7ApiUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SECRET_PUSH7_APIKEY}`,
    },
  });

  if (!response.ok) {
    res.status(500).send('500');
    return;
  }

  res.status(200).send('200');
};
