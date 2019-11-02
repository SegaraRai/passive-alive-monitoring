import { NowRequest, NowResponse } from '@now/node';

import { config } from './_utils/config';
import { ids, idDeviceMap } from './_utils/device';
import { get } from './_utils/kvs';
import { logWrapper } from './_utils/logWrapper';
import { deserializeLastUpdate } from './_utils/util';


export default logWrapper(async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send('405');
    return;
  }

  const promises = ids.map(id => (async () => {
    const { name, threshold } = idDeviceMap.get(id)!;
    const lastUpdate = deserializeLastUpdate(await get(config.deviceKeyPrefix + id));
    return {
      id,
      name,
      threshold,
      lastUpdate,
    };
  })());

  const data = await Promise.all(promises);

  res.json(data);
});
