import { DataTypes } from "sequelize";
import db from "../mysql/connection";


const Ingreso = db.define('T01_ingreso',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    codigo:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.BOOLEAN  
    }
    
},{
    timestamps: true,
});



export default Ingreso;