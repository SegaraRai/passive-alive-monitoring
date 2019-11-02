import { Device, config } from './config';


export const ids = config.devices.map(device => device.id);

export const idSet = new Set(ids);

export const idDeviceMap = config.devices.reduce((acc, device) => acc.set(device.id, device), new Map<string, Device>());
