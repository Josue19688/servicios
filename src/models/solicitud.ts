
import { DataTypes } from "sequelize";
import db from "../mysql/connection";


const Solicitud = db.define('T03_solicituds',{
    id_solicitud:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    id_division:{
        type:DataTypes.INTEGER
    },
    id_depto:{
        type:DataTypes.INTEGER
    },
    id_tipo:{
        type:DataTypes.INTEGER
    },
    fecha_opera:{
        type:DataTypes.DATE
    },
    sede: {
        type:DataTypes.STRING   
    },
    nombre_solicita:{
        type:DataTypes.STRING
    },
    puesto:{
        type:DataTypes.STRING
    },
    autoriza:{
        type:DataTypes.STRING
    },
    ext:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.INTEGER
    },
    descripcion:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING
    },
    autorizacion:{
        type:DataTypes.INTEGER
    },
    asigno:{
        type:DataTypes.STRING
    },
    fecha_sol:{
        type:DataTypes.DATEONLY
    },
},{
    timestamps: false
});

export default Solicitud;