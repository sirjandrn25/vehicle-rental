import * as z from "zod"
import { CompleteFolder, RelatedFolderModel } from "./index"

export const FileModel = z.object({
  id: z.string(),
  url: z.string(),
  folder_id: z.string(),
  created_at: z.date().nullish(),
})

export interface CompleteFile extends z.infer<typeof FileModel> {
  folder: CompleteFolder
}

/**
 * RelatedFileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFileModel: z.ZodSchema<CompleteFile> = z.lazy(() => FileModel.extend({
  folder: RelatedFolderModel,
}))
