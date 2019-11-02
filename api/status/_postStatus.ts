import { NowRequest, NowResponse } from '@now/node';
import { idSet } from '../_utils/deviceIds';
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

  await set(id, serializeLastUpdate(lastUpdate));

  res.json({
    id,
    lastUpdate,
  });
};
