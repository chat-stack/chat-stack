import { Logger } from '@nestjs/common';

import { inspect } from 'util';

const DeepLog = (obj: any, depth = 3, context?: string) => {
  Logger.log(
    inspect(obj, {
      showHidden: false,
      depth,
      colors: true,
    }),
    context,
  );
};

export default DeepLog;
