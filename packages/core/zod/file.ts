import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteFolder,
  RelatedFolderModel,
} from "./index";

export const FileModel = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  user_id: z.string(),
  folder_id: z.string().nullish(),
  created_at: z.date().nullish(),
});

export const FileModelRename = FileModel.pick({ name: true });
export type FileModelType = z.infer<typeof FileModel>;

export interface CompleteFile extends z.infer<typeof FileModel> {
  user: CompleteUser;
  folder?: CompleteFolder | null;
}

/**
 * RelatedFileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFileModel: z.ZodSchema<CompleteFile> = z.lazy(() =>
  FileModel.extend({
    user: RelatedUserModel,
    folder: RelatedFolderModel.nullish(),
  })
);
