import { Controller } from '@nestjs/common';

export const ApiZone = Zone('api');

export function Zone(ZonePath: string): (p?: string) => ClassDecorator {
    return (path?: string) => {
        if (!path) {
            return Controller(`/${ZonePath}`);
        }

        return Controller(`/${ZonePath}/${path}`);
    };
}