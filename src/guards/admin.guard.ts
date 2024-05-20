// import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
// import {User} from "../entities/user.entity";
// import {InjectRedis} from "@liaoliaots/nestjs-redis";
// import Redis from "ioredis";
//
// @Injectable()
// export class AdminGuard implements CanActivate {
//     constructor(@InjectRedis() private readonly redis: Redis) {}
//     async canActivate(
//         context: ExecutionContext
//     ): Promise<boolean> {
//         const request = context.switchToHttp().getRequest()
//         const sessionId = request.headers.cookie
//             ?.split('; ')
//             .find(cookie => cookie.includes('session_id'))
//             ?.split('=')[1]
//
//         const userString = await this.redis.get(sessionId)
//
//         if (!userString) {
//             return false
//         }
//
//         const user: User = JSON.parse(userString)
//
//         return user ? Boolean(user.is_moderator) : false
//     }
// }
