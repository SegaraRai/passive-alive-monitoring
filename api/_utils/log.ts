import { Response } from 'node-fetch';


function censorContent(content: string) {
  const sensitiveTexts = [
    //[process.env.SECRET_KVDB_BUCKET, 'KVDB_BUCKET'],
    //[process.env.SECRET_KVDB_KEY_PREFIX, 'KVDB_KEY_PREFIX'],
    [process.env.SECRET_KVDB_READKEY, 'KVDB_READKEY'],
    [process.env.SECRET_KVDB_WRITEKEY, 'KVDB_WRITEKEY'],
    [process.env.SECRET_PUSH_KEY, 'PUSH_KEY'],
    [process.env.SECRET_UPDATE_KEY, 'UPDATE_KEY'],
    [process.env.SECRET_SLACK_WEBHOOK_URL, 'SLACK_WEBHOOK_URL'],
  ];

  for (const [sensitiveText, convertTo] of sensitiveTexts) {
    content = content.split(sensitiveText).join(convertTo);
  }

  return content;
}


export async function logError(content: string | Error): Promise<void> {
  if (content instanceof Error) {
    return logError(`${content.name}: ${content.message}`);
  }

  const text = censorContent(content);

  // post to slack
  await fetch(process.env.SECRET_SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      channel: '#service',
      username: 'PAM bot',
      text,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export async function logFetchError(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  let text = `FetchError: \`${response.status} ${response.statusText}\` returned from \`${response.url}\``;
  if (response.size) {
    text += '\n```text\n' + (await response.clone().textConverted()).trim() + '\n```';
  }

  await logError(text);
}
