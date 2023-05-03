import { DataTypes } from "sequelize";
import db from "../mysql/connection";


const Vehiculo = db.define('T10_movimientovehiculos',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    piloto:{
        type:DataTypes.STRING
    },
    vehiculo:{
        type:DataTypes.STRING
    },
    kmsalida:{
        type:DataTypes.STRING
    },
    kmingreso:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.BOOLEAN  
    },
    csalida:{
        type:DataTypes.STRING
    },
    cingreso:{
        type:DataTypes.STRING
    },
    sede:{
        type:DataTypes.STRING
    }
},{
    timestamps: true,
});



export default Vehiculo;