import { z } from 'zod'

import { okamiHttpGateway } from '@/lib/axios'

const getUserDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarImageUrl: z.string().url().nullable(),
  avatarImageId: z.string(),
  finishedWorksCount: z.number(),
  readingWorksCount: z.number(),
})

export type GetUserDetailsType = z.infer<typeof getUserDetailsSchema>

export async function getUserDetails() {
  const { data } =
    await okamiHttpGateway.get<GetUserDetailsType>('/auth/user/me')

  console.log(getUserDetailsSchema.parse(data))

  return getUserDetailsSchema.parse(data)
}
