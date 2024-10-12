import { Exclude } from 'class-transformer';

export class SerializedTransaction {
  @Exclude()
  user:any;

  @Exclude()
  products:any

  constructor(partial: Partial<SerializedTransaction>) {
    Object.assign(this, partial);
  }
}
