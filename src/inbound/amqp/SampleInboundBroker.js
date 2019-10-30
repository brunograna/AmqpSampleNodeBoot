module.exports = class AdapterSmsOnlineInboundBroker {

    constructor({
                    logger,
                    rabbitMqAmqpProvider,
                }){
        this.logger = logger;
        this.amqpProvider = rabbitMqAmqpProvider;
    }

    async startMessage(payload, channel){
        const { logger } = this;
        logger.info(`starting subscribe from x-message-created`);
        let message, headers;
        try{
            message = JSON.parse(payload.content.toString());
            headers = payload.properties.headers;

            logger.info(`Payload: ${JSON.stringify(message)} \n Headers: ${JSON.stringify(headers)}`);
            //Acknowledge the message
            channel.ack(payload);
        }catch (e) {
            logger.error(e);
            //Not Acknowledge the message
            channel.nack(payload);
        }
        logger.info("finishing subscribe from x-message-created");
    }

    async listenForResults() {
        const {amqpProvider} = this;

        await amqpProvider.consumeExchangeByQueue([
            ["x-message-created", "x-message-created.q-message-created", this.startMessage.bind(this)],
        ]);
    }

};