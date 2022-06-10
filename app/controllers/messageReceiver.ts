import {
  Whatsapp
} from 'venom-bot'

import { Message } from '../models/messageModel';

import readMessages from '../services/messages/readMessages';

export default async function (client: Whatsapp) {
  client.onAnyMessage(async (message: Message) => {
    let response = await readMessages(message,client);

    if(response){
      await client.sendText(message.from, 'Teste #1')
      .catch((erro) => {
        console.error('Error when sending: ', erro)

      })
    }
  });
}
