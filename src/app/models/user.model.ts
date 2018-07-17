import { Role } from './role.model';

export interface User {
  id: number;
  companyId: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  supervisorId: number;
  supervisor: User;
  roles: Role[];
}