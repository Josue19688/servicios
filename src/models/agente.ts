import { DataTypes } from "sequelize";
import db from "../mysql/connection";
import Turno from "./turnos";


const Agente = db.define('T10_Agente',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    dpi:{
        type:DataTypes.STRING
    },
    telefono:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING
    },
    nacimiento:{
        type:DataTypes.STRING
    },
    direccion:{
        type:DataTypes.STRING
    },
    igss:{
        type:DataTypes.STRING
    },
    nit:{
        type:DataTypes.STRING
    },
    sangre:{
        type:DataTypes.STRING
    },
    puesto:{
        type:DataTypes.STRING
    },
    grupo:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.STRING
    },
    imagen:{
        type:DataTypes.STRING
    },
    licenciaarma:{
        type:DataTypes.STRING
    },
    licenciavehiculo:{
        type:DataTypes.STRING
    },
    cv:{
        type:DataTypes.STRING
    },
    ficha:{
        type:DataTypes.STRING
    }
},{
    timestamps: true,
});

//Agente.hasMany(Turno,{foreignKey:'AgenteId'})
(Agente as any).associate =  function(models:any){
    Agente.hasMany(models.Turno,{foreignKey:'AgenteId'});
}

export default Agente;