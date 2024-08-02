import * as bcrypt from 'bcrypt';

export const encodePassword = (rawPassword: string) => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT);
};

export const comparePassword = async (rawPassword: string, hash: string) => {
  return await bcrypt.compare(rawPassword, hash);
};
