import { SetMetadata } from "@nestjs/common";

export const hasRoles=((...hashRoles:string[])=>SetMetadata('roles',hashRoles))