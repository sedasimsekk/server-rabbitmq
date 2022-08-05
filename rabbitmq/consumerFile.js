import amqp from "amqplib"
import rabbitMqConnection from "./rabbitmqConnection.js"
import fs from "fs";
const queueName = "mesajKuyrugu"


async function onConsumeFile() {
    const connection = await rabbitMqConnection();
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName)
    channel.consume(queueName, (user) => {
        console.log(user.content.toString())
        setTimeout(() => {
            const users= JSON.parse(user.content.toString());

            //dosyaya yazma
            const files="./file";
            const data=`
            Hello ${users.user.FirstName} ${users.user.LastName},

            Welcome to Dzd candidate test platform, your registering have been approved, and now you can connect to WEBSITEURL/login to use the platform.

            Dzd Team`;
            if(!fs.existsSync(files)){
                fs.mkdirSync(files);
            }
            fs.writeFile(files+`/${users.user.UserName}.txt`,data,"utf8",(err)=>{
                if(err){
                    console.log("hatalı");
                }else{
                    console.log("dosya oluştu");
                }
            });
            //dosyaya yazma bitiş 

            channel.ack(user)
        }, 1000)
        
    })

}

onConsumeFile();