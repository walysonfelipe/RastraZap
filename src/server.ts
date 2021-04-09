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

             client.sendText(message.from, 'Olá meu nome é  🙋🏾‍♂️ Andy !\n\n Quer saber aonde está sua encomenda ? !\n\n *📦 Digite o codigo de rastreio...*')
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
              client.sendText(message.from,'📦 Sua Encomenda '+ message.body +', Veja aqui  abaixo 👇🏾\n');
              return new Promise(function (resolve, reject) {
                changeUser(user.from, 'stage', 2);
                api(message.body).then((data:any)=>{
                  data.reverse();

                  data.forEach(result => {
                     SendMessageEnco(client, message.from,message.body, result);
                  });
                }).then(()=>{
                  client.sendText(message.from,'Para pesquisar novamente *_Digite 1_* e pra sair *_Digite 2_* \n');
                });

              });

            }
            else{
              client.sendText(message.from, '❌ *Código inválido* , Redigite o Código de Rastreio !!')
              .then((result) => {
                changeUser(user.from, 'stage', 1)
              })
              .catch((erro) => {
                console.error('Erro ao enviar mensagem: ', erro); //return um objeto de erro
              });
            }
          }

          else if(user.stage === 2){
            if(message.body == 1 ){
              client.sendText(message.from, 'Digite um novo *Código de Rastreio* ').then((res)=>{
                changeUser(user.from, 'stage', 1)
              })
            }
            else if (message.body == 2){
              client.sendText(message.from, 'Agradecemos pelo uso de nosso *BOT* , Volte Sempre.....👋🏾👋🏾 ').then((res)=>{
                changeUser(user.from, 'stage', 0)
              })
            }
          }
      }
      });

  async function SendMessageEnco(client: Whatsapp, from:any,messagebody:any, data:any){
      if(!data.destino){
      client.sendText(from, '📅 *DATA:* ' + data.dataHora + '\n\n ✅ *STATUS:* *_' + data.descricao + '_*\n\n' + '🏘 *CIDADE:* ' + data.cidade + "/" + data.uf );
      }
      else{
        client.sendText(from, '📅 *DATA:* ' + data.dataHora + '\n\n ✅ *STATUS:* *_' + data.descricao + '_*\n\n' + '🏘 Cidade:' + data.destino.cidade + "/" + data.destino.uf );
      }



   }
/*







*/



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



