import {
 rastrearEncomendas
} from 'correios-brasil'

export default async function ({ code }: { code: any; }){
const codes = [];

codes.push(code);
  return await rastrearEncomendas(codes).then((response)=>{
      return response;
  }).catch((err)=>{
     return [
       {
         'status': "error"
       }
     ];
  });
}


// import trackOrderCorreios from "../tracker/trackOrderCorreios";

// trackOrderCorreios({ code: "QJ370567096BR" }).then((teste)=>{
//   console.log(teste);
// })
