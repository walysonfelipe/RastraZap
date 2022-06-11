import { changeUser } from '../../subscribers/database'
import correiosTracker from '../tracker/correios'
import { User } from '../../models/userModel'
import { Correios } from '../../models/correiosModel'
async function execute(user: User, code: string) {
  const messagesToSend: any = []
     
    if(code.length != 13){
     messagesToSend.push('❌ *Código inválido* , Digite o Código de Rastreio novamente!!') 
     return messagesToSend  
    }

    messagesToSend.push('*📦 Sua Encomenda *'+ code +'*, Veja aqui  abaixo 👇🏾') 
     await correiosTracker(code).then((trackedParcel:any)=>{
            
            trackedParcel[0].forEach((parcelPoint: Correios) => {
            if(parcelPoint.local){
              messagesToSend.push('✅ *STATUS:* *_'+ parcelPoint.status +'_*\n\n 📅 *DATA:* '+ parcelPoint.data +' - ' + parcelPoint.hora +'\n\n *📬 LOCAL:* ' + parcelPoint.local);
            }
            else{
                messagesToSend.push('✅ *STATUS:* *_'+ parcelPoint.status +'_*\n\n 📅 *DATA:* '+ parcelPoint.data +' - ' + parcelPoint.hora +'\n\n *🏙️ ORIGEM:* ' + parcelPoint.origem +'*\n\n *🚚 DESTINO:* ' + parcelPoint.destino);  
            }
            });
    });
     
   // code
  // buscar codigo 

// montar layout da mensagem



//   changeUser(user.from, 'stage', 2)
//   messagesToSend.push('Olá meu nome é Rastry🙋🏾‍♂️, sou fascinado por rastrear encomendas📦')
//   messagesToSend.push('Quer saber aonde está sua encomenda ? !\n\n *📦 Digite o codigo de rastreio...*')
  return messagesToSend
}


export {
  execute
}
