import { Message } from '../../models/messageModel';
import { User } from '../../models/userModel';

import stages from './stages'

export default async function (
  user: User,
  message: Message
) {
  
  const messagesToSend = await stages[user.stage].customer?.execute(user, message.body)

  return messagesToSend
}

