import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const FolderModel = z.object({
  id: z.string(),
  name: z.string(),
  path: z.string(),
  user_id: z.string(),
  created_at: z.date().nullish(),
})

export interface CompleteFolder extends z.infer<typeof FolderModel> {
  user: CompleteUser
}

/**
 * RelatedFolderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFolderModel: z.ZodSchema<CompleteFolder> = z.lazy(() => FolderModel.extend({
  user: RelatedUserModel,
}))
