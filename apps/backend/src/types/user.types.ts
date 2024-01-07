import { z } from "zod";
import { UserModel } from "../zod";

export type userType = z.infer<typeof UserModel>;
