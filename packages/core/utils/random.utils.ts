const crypto = require("crypto");
export class RandomUtils {
    static generateIdentifier(value: string) {
        const title = `${value.toLowerCase().split(" ").join("-")}`;
        return `${title}${RandomUtils.randomString()}`;
    }

    static randomString() {
        try {
            const buf = crypto.randomBytes(60);
            return buf.toString("utf8");
        } catch (error) {
            return "";
        }
    }
}
