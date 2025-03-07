import type { Role } from 'types';

export const getRoleById = (roles: Role[], selectedRoleId: string): Role => {
    return roles.find(role => role.id === selectedRoleId) as Role;
};
