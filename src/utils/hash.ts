import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  } catch (error) {
    console.error(`Error while hashing password: ${error}`);
    return undefined;
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatch;
  } catch (error) {
    console.error(`Error while comparing password: ${error}`);
    return false;
  }
};
