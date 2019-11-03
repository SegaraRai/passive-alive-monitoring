import { NowRequest, NowResponse } from '@now/node';

import { config } from './_utils/config';
import { get } from './_utils/kvs';
import { logWrapper } from './_utils/logWrapper';


export default logWrapper(async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send('405');
    return;
  }

  const lastUpdate = parseInt(String(await get(config.lastUpdateKey)), 10);

  const data = {
    currentTime: Date.now(),
    lastUpdate: isNaN(lastUpdate) ? null : lastUpdate,
  };

  res.json(data);
});
