import amqp from "amqplib"

const rabbitMqConnection = async () => {
    const connection = await amqp.connect()
    return connection;
}

export default rabbitMqConnection; 