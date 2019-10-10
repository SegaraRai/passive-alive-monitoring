import { NowRequest, NowResponse } from '@now/node';


export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'GET') {
    res.status(405).send('405');
    return;
  }

  res.status(200).send(process.env.SECRET_PUSH7_APPID);
};
