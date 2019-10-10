import { NowRequest, NowResponse } from '@now/node';
import { ids } from './_utils/deviceIds';
import { get } from './_utils/kvs';
import { deserializeLastUpdate } from './_utils/util';


export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send('405');
    return;
  }

  const promises = ids.map(id => (async () => {
    const lastUpdate = deserializeLastUpdate(await get(id));
    return {
      id,
      lastUpdate,
    };
  })());

  const data = await Promise.all(promises);

  res.json(data);
};
