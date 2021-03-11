import {
  create as createSession,
  Whatsapp
} from 'venom-bot'

import 'dotenv/config';




 createSession({
  session: 'session',
  browserSessionToken: {
    WABrowserId: process.env.WABROWSERID,
    WASecretBundle: process.env.WASECRETBUNDLE,
    WAToken1: process.env.WATOKEN1,
    WAToken2: process.env.WATOKEN2
  }
})
.then(client => start(client))
  .catch(err => {
    throw err
  })



function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Oi' || message.body === 'Olá') {
      client
        .sendText(message.from, 'Olá! Tudo bem com você?')
        .then((result) => {
          console.log('Result: ', result); //retorna um objeto de successo
        })
        .catch((erro) => {
          console.error('Erro ao enviar mensagem: ', erro); //return um objeto de erro
        });
    }
  });
}
