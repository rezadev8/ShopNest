import { Exclude } from 'class-transformer';

export class SerializedUser {
  email: string;

  phone:number;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
