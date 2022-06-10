import {
  Whatsapp
} from 'venom-bot'

import { Message } from '../../models/messageModel';


export default async function (message:Message, client:Whatsapp){
  if(message.isGroupMsg === false && message.type === 'chat' && !message.fromMe) {
      await client.sendSeen(message.from);
        return true;
  }
}
