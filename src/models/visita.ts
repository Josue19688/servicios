import { DataTypes } from "sequelize";
import db from "../mysql/connection";


const Visita = db.define('T01_visita',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tipo:{
        type:DataTypes.STRING
    },
    puesto:{
        type:DataTypes.STRING
    },
    nombre:{
        type:DataTypes.STRING
    },
    dpi:{
        type:DataTypes.STRING
    },
    colaborador:{
        type:DataTypes.STRING,
    },
    proveniente:{
        type:DataTypes.STRING
    },
    fecha:{
        type:DataTypes.DATE
    },
    ingreso:{
        type:DataTypes.TIME
    },
    salida:{
        type:DataTypes.TIME
    },
    placa:{
        type:DataTypes.STRING
    },
    vehiculo:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    imagen:{
        type:DataTypes.STRING
    }
},{
    timestamps: true,
});



export default Visita;