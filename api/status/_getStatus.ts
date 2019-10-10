import { NowRequest, NowResponse } from '@now/node';
import { idSet } from '../_utils/deviceIds';
import { get } from '../_utils/kvs';
import { deserializeLastUpdate } from '../_utils/util';


export default async (req: NowRequest, res: NowResponse) => {
  const id = req.query.id as string;

  if (!idSet.has(id)) {
    res.status(404).send('404');
    return;
  }

  const lastUpdate = deserializeLastUpdate(await get(id));

  res.json({
    id,
    lastUpdate,
  });
};
