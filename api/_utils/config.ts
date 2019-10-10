interface Device {
  id: string;
}

interface Config {
  devices: Device[];
}


export const config: Config = {
  devices: [
    {
      id: 'raspi',
    },
  ],
};
