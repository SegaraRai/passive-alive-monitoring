import { Device } from '../_utils/config';
import slack from './slack';


export interface Status {
  type: 'up' | 'down';
  since: Date;
  duration: number;   // in milliseconds
  strSince: string;
  strDuration: string;
}


export interface ActionData {
  device: Device;
  status: Status;
}


export type Action = (actionData: ActionData) => Promise<void>;


export const actions: Action[] = [
  slack,
];
