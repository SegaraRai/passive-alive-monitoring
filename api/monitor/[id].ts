import { NowRequest, NowResponse } from '@now/node';
import { idSet } from '../_utils/deviceIds';
import { get } from '../_utils/kvs';
import { deserializeLastUpdate } from '../_utils/util';


export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send('405');
    return;
  }

  const id = req.query.id as string;

  if (!idSet.has(id)) {
    res.status(404).send('404');
    return;
  }

  const threshold = parseInt(String(req.query.threshold), 10) * 1000;
  if (isNaN(threshold)) {
    res.status(400).send('400');
    return;
  }

  const lastUpdate = deserializeLastUpdate(await get(id));

  if (lastUpdate == null) {
    res.status(503).send('503,null,null');
    return;
  }

  const duration = Date.now() - lastUpdate;
  const alive = duration < threshold;
  const status = alive ? 200 : 503;

  res.status(status).send(`${status},${lastUpdate},${duration}`);
};
