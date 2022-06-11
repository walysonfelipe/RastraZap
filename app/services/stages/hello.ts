import { changeUser } from "../../subscribers/database"
import { User } from '../../models/userModel'
async function execute(user: User) {
  const messagesToSend: any = []

  changeUser(user.from, 'stage', 1)
  messagesToSend.push('Olá meu nome é Rastry🙋🏾‍♂️, sou fascinado por rastrear encomendas📦')
  messagesToSend.push('Quer saber aonde está sua encomenda ? !\n\n *📦 Digite o codigo de rastreio...*')
  return messagesToSend
}


export {
  execute
}
