import {
  Whatsapp
} from 'venom-bot'

import { Message } from '../models/messageModel';

import readMessages from '../services/messages/readMessages';
import userService from '../services/userService'
import executeStages from '../services/stages/execute';
import sendMessages from '../services/messages/sendMessages';
import { User } from '../models/userModel';
export default async function (client: Whatsapp) {
  client.onAnyMessage(async (message: Message) => {
    let user: User;
    if (
      !message.fromMe &&
      message.from !== 'status@broadcast' &&
      message.isGroupMsg === false) {
      user = await userService(message.from);

      let response = await readMessages(message, client, user);

      if (response) {
        let messageToSend = await executeStages(user,message)

        sendMessages(messageToSend, message, client);
      }

    }
  });
}
