import {
 rastrearEncomendas
} from 'correios-brasil'


export default async function trackOrder(code:string){
  let codes:any[] = []
  codes.push(code);
 return await rastrearEncomendas(codes)
    .then((response)=>{
      return response
    }) .catch((err)=>{
      console.log(err)
    })
}



// import trackOrderCorreios from "../tracker/trackOrderCorreios";

// trackOrderCorreios({ code: "QJ370567096BR" }).then((teste)=>{
//   console.log(teste);
// })
