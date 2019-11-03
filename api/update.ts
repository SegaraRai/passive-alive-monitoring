import { NowRequest, NowResponse } from '@now/node';
import moment = require('moment');

import { Device, config } from './_utils/config';
import { get, set } from './_utils/kvs';
import { logError } from './_utils/log';
import { logWrapper } from './_utils/logWrapper';
import { deserializeLastUpdate } from './_utils/util';
import { actions, ActionData } from './_actions';


interface DeviceInfo {
  id: string;
  up: boolean;
  since: number;
}

interface Context {
  devices: DeviceInfo[];
}


const initialContext: Context = {
  devices: [],
};


function nanAsZero(number: number): number {
  return isNaN(number) ? 0 : number;
}


async function checkDevice(currentTime: number, context: Context, device: Device) {
  const deviceLastUpdate = deserializeLastUpdate(await get(config.deviceKeyPrefix + device.id));

  const currentUp = deviceLastUpdate != null && currentTime - deviceLastUpdate < device.threshold;

  const deviceInfo = context.devices.find(d => d.id === device.id) || {
    id: device.id,
    up: false,
    since: currentTime,
  };

  if (deviceInfo.up === currentUp) {
    return;
  }

  const since = new Date(deviceInfo.since);
  const duration = currentTime - deviceInfo.since;

  const actionData: ActionData = {
    device,
    status: {
      type: currentUp ? 'up' : 'down',
      duration,
      since,
      strDuration: moment.duration(duration).locale('en').humanize(),
      strSince: moment(since).tz('Asia/Tokyo').locale('en').format(),
    },
  };

  await Promise.all(actions.map(action => action(actionData)));

  deviceInfo.since = currentTime;
  deviceInfo.up = currentUp;
}


export default logWrapper(async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('405');
    return;
  }

  if (req.body.key !== process.env.SECRET_SERVICE_UPDATE_KEY) {
    res.status(403).send('403');
    return;
  }

  const promises: Promise<any>[] = [];

  //

  const currentTime = Date.now();

  const lastUpdate = nanAsZero(parseInt(String(await get(config.lastUpdateKey)), 10));
  if (currentTime - lastUpdate < config.minUpdateInterval) {
    res.status(429).send('429');
    return;
  }

  promises.push(set(config.lastUpdateKey, currentTime.toString(10)));

  if (currentTime - lastUpdate > config.maxUpdateInterval) {
    const strSince = moment(lastUpdate).tz('Asia/Tokyo').locale('en').format();
    const strDuration = moment.duration(currentTime - lastUpdate).locale('en').humanize();
    promises.push(logError(`Warning: PAM was not working since ${strSince} (${strDuration})`));
  }

  //

  const strContext = await get(config.contextKey);
  const context = strContext ? JSON.parse(strContext) as Context : initialContext;

  //

  promises.concat(config.devices.map(device => checkDevice(currentTime, context, device)));

  //

  await Promise.all(promises);

  //

  await set(config.contextKey, JSON.stringify(context));

  //

  res.status(200).send('200');
});
