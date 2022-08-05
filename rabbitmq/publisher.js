import amqp from "amqplib"
import rabbitMqConnection from "./rabbitmqConnection.js"

const queueName = "mesajKuyrugu";
const queueNameUpdate = "updateKuyrugu";
const queueNameEmail = "emailKuyrugu";

 export const publisher = async (user) => {
    try {
        const connection = await rabbitMqConnection();
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName)
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ user: user })))
        console.log(' Mesaj Kuyruğuna Gitti')
    } catch (error) {
        console.log('hata', error)
    }
}

 export const publisherUpdate = async (user) => {
    try {
        const connection = await rabbitMqConnection();
        const channel = await connection.createChannel();
        await channel.assertQueue(queueNameUpdate)
        channel.sendToQueue(queueNameUpdate, Buffer.from(JSON.stringify({ user: user })))
        console.log(' Update Kuyruğuna Gitti')
    } catch (error) {
        console.log('hata', error)
    }
}

export const publisherEmail = async (user) => {
    try {
        const connection = await rabbitMqConnection();
        const channel = await connection.createChannel();
        await channel.assertQueue(queueNameEmail)
        channel.sendToQueue(queueNameEmail, Buffer.from(JSON.stringify({ user: user })))
        console.log(' Email Kuyruğuna Gitti')
    } catch (error) {
        console.log('hata', error)
    }
}


