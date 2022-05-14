import { MailAdapter, SendMailData } from "./mail-adapter";
import nodemailer from 'nodemailer'

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "9abf0663d5ab53",
            pass: "7dc244867e2d92"
        }
    });

export class NodeMailerAdapter implements MailAdapter {

    async sendMail({subject, body } : SendMailData) {

        const feedback =

            await transport.sendMail({
                from: "Equipe Feedget <oi@feedget.com>",
                to: "Mau <mauricioandreolla0000@gmail.com>",
                subject: subject,
                html: body

            });

    }

}