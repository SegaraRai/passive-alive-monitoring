export interface Device {
  id: string;
  name: string;
  threshold: number;
}

export interface Config {
  devices: Device[];
  contextKey: string;
  lastUpdateKey: string;
  deviceKeyPrefix: string;
  minUpdateInterval: number;
  maxUpdateInterval: number;
}


export const config: Config = {
  devices: [
    {
      id: 'raspi',
      name: 'raspi',
      threshold: 20 * 60 * 1000,
    },
  ],
  contextKey: 'context',
  lastUpdateKey: 'lastUpdate',
  deviceKeyPrefix: 'device-',
  minUpdateInterval: (1 * 60 - 10) * 1000,
  maxUpdateInterval: (5 * 60 + 10) * 1000,
};
