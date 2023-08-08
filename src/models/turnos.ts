import { DataTypes } from "sequelize";
import db from "../mysql/connection";



const Turno = db.define('T01_turnos',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    inicio:{
        type:DataTypes.DATEONLY
    },
    final:{
        type:DataTypes.DATEONLY
    },
    puesto:{
        type:DataTypes.STRING
    },
    horario:{
        type:DataTypes.STRING
    },
    turno:{
        type:DataTypes.STRING
    }
},{
    timestamps: true,
});



export default Turno;