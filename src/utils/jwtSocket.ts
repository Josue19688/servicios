import jwt from 'jsonwebtoken';


interface JwtPayload {
    id: string

}

export const comprobarJWT =async (token:any='') => {
    try {
        const {id} = jwt.verify(token, 'CCdGc1AA12O23') as JwtPayload;
        return [true,id]
    } catch (error) {
        return [false,null];
    }
}