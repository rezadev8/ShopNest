import { Exclude } from 'class-transformer';

export class SerializedUser {
  @Exclude()
  password: string;

  @Exclude()
  role: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
