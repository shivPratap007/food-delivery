import bcrypt from "bcrypt";

export async function PasswordUtility(instance: any, next: any) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    instance.salt = salt;
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(instance.password, salt);
    // Replace plain password with hashed password
    instance.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
}
