export class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  supervisorId: number;
  supervisor?: {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    supervisorId: number
  };
}
