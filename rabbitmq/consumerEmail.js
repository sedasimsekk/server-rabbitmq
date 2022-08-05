import amqp from "amqplib"
import rabbitMqConnection from "./rabbitmqConnection.js"
import nodemailer from "nodemailer";
const queueName = "emailKuyrugu";


async function onConsumeEmail() {
    const connection = await rabbitMqConnection();
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName)
    channel.consume(queueName, (user) => {
        console.log(user.content.toString())
        setTimeout(() => {
            const users= JSON.parse(user.content.toString());
            const data=`
            Hello ${users.user.FirstName} ${users.user.LastName},

            Welcome to Dzd candidate test platform, your registering have been approved, and now you can connect to WEBSITEURL/login to use the platform.

            Dzd Team`;
            let transporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'nodee.rabbit@gmail.com',
                    pass:'wgveeqlbamimmuro'
                }
            })

            let mailOptions ={
                from:`"Node Rabbit" <nodee.rabbit@gmail.com>`,
                to:users.user.Email,
                subject:'Welcome',
                text:data
            }
            transporter.sendMail(mailOptions,(err,data)=>{
                if(err) console.log(err);
                else console.log("mail gönderildi");
            })
            channel.ack(user)
        }, 1000)
        
    })

}

onConsumeEmail();



