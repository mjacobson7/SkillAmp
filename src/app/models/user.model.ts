import { Role } from './role.model';

export class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  supervisorId: number;
  roles: Role[];
  supervisor: User;
}
