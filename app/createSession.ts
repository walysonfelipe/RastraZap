import { create} from 'venom-bot';

create('PedBot')
    .then((client) => {
      console.log(client);
      //  messageReceiver(client);
    }).catch(clientErr => {
        console.log(clientErr);
    });
