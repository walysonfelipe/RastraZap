import {
  create as createSession,
  Message,
  Whatsapp
} from 'venom-bot'

import 'dotenv/config';
import {
  existsOnDatabase,
  saveUserOnDatabase,
  changeUser,
  User
} from './lib/user/user'
import fetch from 'node-fetch';
/*
   Lista de Mensagens Predefinidas
   Vefirificar quais são iguais
   Criar etapas
   Buscar encomenda

*/


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
    client.onAnyMessage(async message => {
      if (
        !message.fromMe &&
        message.from !== 'status@broadcast' &&
        message.isGroupMsg === false
      ) {
        let user = existsOnDatabase(message.from)

        if (!user) {
          user = saveUserOnDatabase(message.from)
        }


        if(user.stage === 0){
        if (message.body === 'Oi' || message.body === 'Olá') {
          client
            .sendText(message.from, 'Olá! Tudo bem com você?')
            .then((result) => {
              changeUser(user.from, 'stage', 1)
            })
            .catch((erro) => {
              console.error('Erro ao enviar mensagem: ', erro); //return um objeto de erro
            });
        }
      }
      else if(user.stage === 1){
       if(message.body.length === 13 ){
        return new Promise(function (resolve, reject) {
             api(message.body).then((data:any)=>{
             console.log(data);
        })
      });
        client
        .sendText(message.from, 'Seu Pacote está aqui 📦')
        .then((result) => {
          changeUser(user.from, 'stage', 0)
        })
        .catch((erro) => {
          console.error('Erro ao enviar mensagem: ', erro); //return um objeto de erro
        });
      }
    }
      }
    })

  /*  client.onMessage((message) => {
      if (message.body === 'Oi' || message.body === 'Olá') {

        client
          .sendText(message.from, "ola")
          .then((result) => {
            console.log('Result: ', result); //retorna um objeto de successo
          })
          .catch((erro) => {
            console.error('Erro ao enviar mensagem: ', erro); //return um objeto de erro
          });
      }
    });*/
  }


 async function api(code:any) {
  return new Promise(function (resolve, reject) {
  fetch("https://api.rastrearpedidos.com.br/api/rastreio/v1?codigo=" + code).then(res => res.json())
  .then(res => {
      resolve(res);
  });
  });
  }



