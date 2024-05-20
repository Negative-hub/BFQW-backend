// import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
// import {InjectRedis} from "@liaoliaots/nestjs-redis";
// import Redis from "ioredis";
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(@InjectRedis() private readonly redis: Redis) {}
//     async canActivate(
//         context: ExecutionContext
//     ): Promise<boolean> {
//         const request = context.switchToHttp().getRequest()
//         const sessionId = request.headers.cookie
//             ?.split('; ')
//             .find(cookie => cookie.includes('session_id'))
//             ?.split('=')[1]
//         const user = await this.redis.get(sessionId)
//
//         return Boolean(user)
//     }
// }
