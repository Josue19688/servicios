import { DataTypes } from "sequelize";
import db from "../mysql/connection";
import Archivo from "./archivo";
import Novedad from "./novedad";
import Visita from "./visita";


const Usuario = db.define('T01_usuarios',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            isEmail: {
                msg : 'Agrega un Correo Válido'
            },
            notEmpty: {
                msg: 'El e-mail no puede ir vacio'
            }
        }
    },
    contrasena:{
        type:DataTypes.STRING,
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    imagen:{
        type:DataTypes.STRING
    },
    token:{
        type:DataTypes.STRING
    },
    unidad:{
        type:DataTypes.STRING
    },
    rol:{
        type:DataTypes.STRING,
        defaultValue:'USER_ROLE'
    },
},{
    timestamps: true,
    scopes: {
        withoutPassword: {
          attributes: { exclude: ['contrasena'] },
        }
    }
});

//para registrar las novedades que ingresa el usuario
Usuario.hasMany(Novedad);
Usuario.hasMany(Visita);
Usuario.hasMany(Archivo);
export default Usuario;