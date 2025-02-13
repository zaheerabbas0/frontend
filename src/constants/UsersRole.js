export const ADMIN = 'admin';
export const USER = 'user';

export const ROLES = {
  [ADMIN]: 1,
  [USER]: 2,
};

export const keyToRolesMap = {
  1: 'admin',
  2: 'user',
  3: 'customer',
  4: 'super admin',
};

const Permissions = {
  'super admin': [
    'view:dashboard',
    'create:admin',
    'delete:admin',
    'update:admin',
    'view:project',
    // 'create:project',
    'delete:project',
    'update:project',
    // 'create:ticket',
    'export:ticket',
    // 'import:ticket',
    'update:ticket',
    'delete:ticket',
    'escalate:ticket',
    'resolve:approvals',
    'view:resolutions',
    'create:comment',
    'delete:comment',
    'update:comment',
    // 'create:customer',
    'view:customer',
    'update:customer',
    'delete:customer',
    // 'create:contract',
    'update:contract',
    'delete:contract',
    // 'view:users',
    // 'create:users',
    'update:users',
    'delete:users',
    'view:members',
    'create:admins',
    'edit:admins',
    'update:admins',
    'delete:admins',
    'view:admins',
    // 'select:admins',
    'view:chat',
    'chat:internal',
    'create:groupChat',
    'view:systemSetting',
    'view:ticketAction',
    'view:adminAction',
  ],
  admin: [
    'view:dashboard',
    'view:project',
    'create:project',
    'delete:project',
    'update:project',
    'create:ticket',
    'export:ticket',
    'import:ticket',
    'update:ticket',
    'delete:ticket',
    'create:comment',
    'delete:comment',
    'update:comment',
    'view:customer',
    'create:customer',
    'update:customer',
    'delete:customer',
    'create:contract',
    'update:contract',
    'delete:contract',
    'view:users',
    'view:systemSetting',
    'create:users',
    'create:groupChat',
    'update:users',
    'delete:users',
    'escalate:ticket',
    'view:chat',
    'chat:internal',
    'resolve:approvals',
    'view:resolutions',
    'view:ticketAction',
    'view:adminAction',
  ],
  user: [
    'view:dashboard',
    'view:project',
    // 'create:ticket',
    'export:ticket',
    'import:ticket',
    // 'update:ticket',
    // 'delete:ticket',
    'create:comment',
    'delete:ownComment',
    'update:ownComment',
    'view:chat',
    'chat:internal',
    'create:incident',
  ],
  customer: [
    'export:ticket',
    'create:comment',
    'delete:ownComment',
    'update:ownComment',
    'create:incident',
  ],
};

export const getUserRole = () => {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  return keyToRolesMap[userInfo?.role_id];
};

export function hasPermission(permision) {
  const UsersRole = getUserRole();
  // if(!role) return true;
  // if (!role || !Permissions[role]) {
  //   return true;
  // }
  const isAllowed = Permissions[UsersRole]?.includes(permision);
  return isAllowed;
}
