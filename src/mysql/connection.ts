import  {Sequelize} from 'sequelize';



const db = new Sequelize(`${process.env.NAME_DATABASE}`,`${process.env.USER_DATABASE}`,`${process.env.PASS_DATABASE}`,{
    host:process.env.HOST_DATABASE,
    dialect:'mysql',
    port:Number(process.env.MYSQLPORT),
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});


export default db;