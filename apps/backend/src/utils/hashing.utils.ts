const bcrypt = require("bcrypt");
const salt_key = 10;
export class HashingUtils {
  static async hash(password: string) {
    const data = await bcrypt.hash(password, salt_key);
    return data;
  }

  static async compare(password: string, hash_password: string) {
    return await bcrypt.compare(password, hash_password);
  }
}
