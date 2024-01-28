import { z } from "zod";

enum UserRole {
  USER,
  ADMIN,
}

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  role: z.nativeEnum(UserRole),
  name: z.string().nullish(),
  avatar_url: z.string().nullish(),
  github_username: z.string().nullish(),
  password: z.string().nullish(),
});
export type UserType = z.infer<typeof UserModel>;
export const RegisterSchema = z.object({
  email: z
    .string()
    .email()
    .min(1)
    .max(255)
    .transform((v) => v.toLowerCase()),
  password: z.string().min(6).max(255),
  name: z.string().min(1).max(255),
});

export const LoginSchema = RegisterSchema.pick({ email: true, password: true });
export const RefreshTokenSchema = z.object({
  token: z.string(),
});

export const authApiParams = {
  register: {
    endPoint: "/auth/register",
    schema: RegisterSchema,
  },
  login: {
    endPoint: `/auth/login`,
    schema: LoginSchema,
  },
  refreshToken: {
    endPoint: `/auth/refresh-token`,
    schema: RefreshTokenSchema,
  },
};
export const fileApiParams = {};
export const ApiEndPointSupport = {
  auth: authApiParams,
  file: {
    create: {
      endPoint: `/files`,
    },
  },
};
