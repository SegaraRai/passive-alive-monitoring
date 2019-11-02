import { NowRequest, NowResponse } from '@now/node';


export default async (req: NowRequest, res: NowResponse) => {
  res.status(200).send('200');
};
