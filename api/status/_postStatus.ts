import { NowRequest, NowResponse } from '@now/node';

import { config } from '../_utils/config';
import { idSet } from '../_utils/device';
import { set } from '../_utils/kvs';
import { serializeLastUpdate } from '../_utils/util';


export default async (req: NowRequest, res: NowResponse) => {
  const id = String(req.query.id);

  if (!idSet.has(id)) {
    res.status(404).send('404');
    return;
  }

  if (req.body.key !== process.env.SECRET_UPDATE_KEY) {
    res.status(403).send('403');
    return;
  }

  const lastUpdate = Date.now();

  await set(config.deviceKeyPrefix + id, serializeLastUpdate(lastUpdate));

  res.json({
    id,
    lastUpdate,
  });
};
