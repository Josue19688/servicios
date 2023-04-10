import { DataTypes } from "sequelize";
import db from "../mysql/connection";


const Rol = db.define('T01_roles',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    rol:{
        type:DataTypes.STRING
    }
},{
    timestamps: false,
});


export default Rol;