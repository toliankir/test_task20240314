import { UserType } from './user.type';

export interface UserFullType extends UserType {
  email: string;
  name: string;
  password: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}
