import { REDIS_MEMORY_HOST, REDIS_MEMORY_PORT } from "@core/common.constant";
import { RedisMemory } from "@jeloulatam/memory";
import { Provider } from "@nestjs/common";

export const RedisProvider: Provider = {
    provide: "MEMORY",
    useFactory: () =>
        new RedisMemory({
            url: `redis://${REDIS_MEMORY_HOST}:${REDIS_MEMORY_PORT}`,
            database: 0,
            prefix: "usr",
        }),
};