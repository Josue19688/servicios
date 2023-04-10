
import jwt from 'jsonwebtoken';



const generarToken = async(id:String)=>{
    return new Promise((resolve,reject)=>{
        const payload ={id};

        jwt.sign(payload,'CCdGc1AA12O23',{
            expiresIn:'4h'
        },(err:any,token:any)=>{
            if(err){
                reject('No se genero el token');
            }else{
                resolve(token);
            }
        })
    })
}



export default generarToken