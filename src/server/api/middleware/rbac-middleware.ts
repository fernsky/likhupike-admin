import { TRPCError } from '@trpc/server';
import { type inferAsyncReturnType } from '@trpc/server';

export const roles = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

export type Permission = 'create' | 'read' | 'update' | 'delete';
export type UserPermissions = Permission[];
console.log("This is rbac-middleware");

export const permissions: Record<keyof typeof roles, UserPermissions> = {
  ADMIN: ['create', 'read', 'update', 'delete'],
  EDITOR: ['create', 'read', 'update'],
  VIEWER: ['read'],
} as const;

export type RBACContext = {
  user: {
    role: keyof typeof roles;
  };
  userPermissions: UserPermissions;
};

export const rbacMiddleware = async ({ ctx, next }: any) => {
  if (!ctx.user?.role) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to perform this action',
    });
  }

  const userRole = ctx.user.role as keyof typeof roles;
  const userPermissions = permissions[userRole] || [];

  return next({
    ctx: {
      ...ctx,
      userRole,
      userPermissions,
    },
  });
};