import { User } from '../../models/userModel';

import stages from './stages'

export default async function (
  user: User,
) {
  const messagesToSend = await stages[user.stage].customer?.execute(user)

  return messagesToSend
}

