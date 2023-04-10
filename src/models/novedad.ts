import { DataTypes } from "sequelize";
import db from "../mysql/connection";


const Novedad = db.define('T01_novedades',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tipo:{
        type:DataTypes.STRING
    },
    hora:{
        type:DataTypes.TIME
    },
    fecha:{
        type:DataTypes.DATE,
    },
    puesto:{
        type:DataTypes.STRING
    },
    preliminar:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    imagen:{
        type:DataTypes.STRING
    },
},{
    timestamps: true,
});

//para registrar las novedades que ingresa el usuario
//Usuario.hasMany(Novedad);

export default Novedad;