import { config } from './config';


export const ids = config.devices.map(device => device.id);

export const idSet = new Set(ids);
