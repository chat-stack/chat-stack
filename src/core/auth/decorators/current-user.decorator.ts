import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator to inject user into execution context
const CurrentUser = createParamDecorator(
  (_data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

export default CurrentUser;
