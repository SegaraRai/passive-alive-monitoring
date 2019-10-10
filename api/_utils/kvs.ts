import fetch, { Headers } from 'node-fetch';


const baseUrl = `https://kvdb.io/${process.env.SECRET_KVDB_BUCKET}/${process.env.SECRET_KVDB_KEY_PREFIX}`;
const readKey = process.env.SECRET_KVDB_READKEY;
const writeKey = process.env.SECRET_KVDB_WRITEKEY;


export async function get(key: string): Promise<string | null> {
  const url = baseUrl + key;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + Buffer.from(readKey + ':').toString('base64'),
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('failed to get value of key');
  }

  const value = await response.text();

  return value;
}


export async function set(key: string, value: string) {
  const url = baseUrl + key;

  const response = await fetch(url, {
    method: 'POST',
    body: value,
    headers: {
      Authorization: 'Basic ' + Buffer.from(writeKey + ':').toString('base64'),
    },
  });

  if (!response.ok) {
    throw new Error('failed to set value of key');
  }
}
