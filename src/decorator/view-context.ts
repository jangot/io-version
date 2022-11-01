import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ViewContext = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const { url } = ctx.switchToHttp().getRequest();

        return {
            url
        };
    },
);