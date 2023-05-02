import  nodemailer from "nodemailer"


//TODO: SIN TERMINAR DE CONFIGURAR LA OPCION
const enviarMail =  (correo:string,asunto:string,texto:string) => {
    let sender = nodemailer.createTransport({
        host: process.env.MAIL_SERVICE,
        port: 587,
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        },
    });

    let mail = {
        from: "sistema@gmail.com",
        to: correo,
        subject: asunto,
        html: texto,
    };

    sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log('error al envia el correo',error);
        } else {
            console.log("Email sent successfully: " + info.response);
        }
    });
};

export  {
  enviarMail,
};