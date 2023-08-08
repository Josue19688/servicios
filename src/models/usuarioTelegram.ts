import { DataTypes } from "sequelize";
import db from "../mysql/connection";



const UsuarioTelegram = db.define('T01_usuariosTelegram',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    idTelegram:{
        type:DataTypes.STRING
    },
    nombre:{
        type:DataTypes.STRING,
    },
    telefono:{
        type:DataTypes.STRING
    },
},{
    timestamps: true,
});


export default UsuarioTelegram;