import { NowRequest, NowResponse } from '@now/node';

import { logWrapper } from '../_utils/logWrapper';
import getStatus from './_getStatus';
import postStatus from './_postStatus';


export default logWrapper((req: NowRequest, res: NowResponse) => {
  switch (req.method) {
    case 'GET':
      return getStatus(req, res);

    case 'POST':
      return postStatus(req, res);
  }

  res.status(405).send('405');
});
