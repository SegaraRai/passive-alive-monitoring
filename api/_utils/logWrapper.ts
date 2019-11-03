import { NowRequest, NowResponse } from '@now/node';
import { logError } from './log';


type NowFunction = (req: NowRequest, res: NowResponse) => any;


export function logWrapper(func: NowFunction) {
  return async (req: NowRequest, res: NowResponse) => {
    try {
      await func(req, res);
    } catch (error) {
      error = error instanceof Error ? error : String(error);
      await logError(error);

      throw error;
    }
  };
}
