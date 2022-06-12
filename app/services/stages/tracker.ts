import { changeUser } from '../../subscribers/database'
import correiosTracker from '../tracker/correios'
import { User } from '../../models/userModel'
import { Correios } from '../../models/correiosModel'
async function execute(user: User, code: string) {
    const messagesToSend: any = []

    let status = 0

    if (code.length != 13)
        status = 1


    await correiosTracker(code).then((trackedParcel: any) => {
        status = trackedParcel[0].length == 0 ? 1 : status

        if (status == 0) {
            messagesToSend.push('📦 Sua Encomenda *' + code + '*, Veja aqui  abaixo 👇🏾')
            trackedParcel[0].forEach((parcelPoint: Correios) => {
                if (parcelPoint.local) {
                    messagesToSend.push('✅ *STATUS:* *_' + parcelPoint.status + '_*\n\n 📅 *DATA:* ' + parcelPoint.data + ' - ' + parcelPoint.hora + '\n\n *📬 LOCAL:* ' + parcelPoint.local);
                }
                else {
                    messagesToSend.push('✅ *STATUS:* *_' + parcelPoint.status + '_*\n\n 📅 *DATA:* ' + parcelPoint.data + ' - ' + parcelPoint.hora + '\n\n *🏙️ ORIGEM:* ' + parcelPoint.origem + '\n\n *🚚 DESTINO:* ' + parcelPoint.destino);
                }
            });

            messagesToSend.push('Muito obrigado por utilizar nossa solução.. 🥰🥰🥰\n\n *Quer rastrear outra encomenda 📦? *');
        }
        else{
            messagesToSend.push('❌ *Código inválido* , Digite o Código de Rastreio novamente!!') 
        }

    });

    return messagesToSend
}


export {
    execute
}
