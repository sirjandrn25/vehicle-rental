import * as z from "zod";
import { UserRole } from "@prisma/client";
import {
  CompleteUserKey,
  RelatedUserKeyModel,
  CompleteTeamMembership,
  RelatedTeamMembershipModel,
  CompleteUserVerificationToken,
  RelatedUserVerificationTokenModel,
  CompleteUserOneTimePassword,
  RelatedUserOneTimePasswordModel,
  CompleteFolder,
  RelatedFolderModel,
  CompleteFile,
  RelatedFileModel,
} from "./index";

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

export type UserModelType = z.infer<typeof UserModel>;

export interface CompleteUser extends z.infer<typeof UserModel> {
  keys: CompleteUserKey[];
  memberships: CompleteTeamMembership[];
  verification_tokens: CompleteUserVerificationToken[];
  one_time_passwords: CompleteUserOneTimePassword[];
  folders: CompleteFolder[];
  files: CompleteFile[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    keys: RelatedUserKeyModel.array(),
    memberships: RelatedTeamMembershipModel.array(),
    verification_tokens: RelatedUserVerificationTokenModel.array(),
    one_time_passwords: RelatedUserOneTimePasswordModel.array(),
    folders: RelatedFolderModel.array(),
    files: RelatedFileModel.array(),
  })
);
