/**
 * NodeMailer
 */

"use strict";
const nodemailer = require("nodemailer");

exports.confirmSignup = (datas) => {
    async function main() {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "mail.infomaniak.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "info@dcode.design", // generated ethereal user
                pass: "NuagePetit1900", // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: '"Roster: Inscription 👻" <info@dcode.design>', // sender address
            to: datas.username, // list of receivers
            subject: "Confirmation d'email ✔", // Subject line
            text: `Bonjour ${datas.last_name} ${datas.first_name},
            merci pour votre inscription, cliquer sur le lien ci-dessous pour confirmer votre email, merci`, // plain text body
            html: `<b>Bonjour ${datas.last_name} ${datas.first_name}<b>,
                   merci pour votre inscription, cliquer sur le lien ci-dessous pour confirmer votre email, merci.
                   <div><a href="http://localhost:4200/"> Confimer votre email </a></div>`, // html body
        });
    }
    main().catch(console.error);
}


exports.forgotPassword = (datas) => {
    async function main() {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "mail.infomaniak.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "info@dcode.design", // generated ethereal user
                pass: "NuagePetit1900", // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"Roster  👻" <info@dcode.design>', // sender address
            to: datas.username, // list of receivers
            subject: "Mot de pass oublié ✔", // Subject line
            text: `Bonjour,
            Cliquer sur le lien ci-dessous pour changer votre mot de passe, merci`, // plain text body
            html: `<b>Bonjour <b>,
                    cliquer sur le lien ci-dessous pour changer votre mot de passe, merci
                   <div><a href="http://localhost:4200/forgot-password?token=${datas.username}"> Changer votre mot de passe </a></div>`, // html body
        });

    }
    main().catch(console.error);
}

