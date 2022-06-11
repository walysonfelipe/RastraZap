import {
  Whatsapp
} from 'venom-bot'

import { Message } from '../../models/messageModel';
import { User } from '../../models/userModel';

export default async function (message: Message, client: Whatsapp, user: User) {
  if (message.isGroupMsg === false && message.type === 'chat') {
    await client.sendSeen(message.from);

    // if(user.stage !== 0){
    //   para criar o menu e opções
    // }
    return true;
  }
}
