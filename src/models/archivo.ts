import { DataTypes } from "sequelize";
import db from "../mysql/connection";


const Archivo = db.define('T01_archivo',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tipo:{
        type:DataTypes.STRING
    },
    numero:{
        type:DataTypes.STRING
    },
    fecha:{
        type:DataTypes.STRING,
    },
    origen:{
        type:DataTypes.STRING
    },
    unidad:{
        type:DataTypes.STRING
    },
    descripcion:{
        type:DataTypes.STRING
    },
    imagen:{
        type:DataTypes.STRING
    },
    imagenes:{
        type:DataTypes.STRING
    }
},{
    timestamps: true,
});



export default Archivo;