const amqp = require("amqplib");

module.exports = class AdapterSmsOnlineInboundBroker {

    constructor({
                    logger,
                    serviceBusAmqpProvider,
                }){
        this.logger = logger;
        this.amqpProvider = serviceBusAmqpProvider;
    }

    async startMessage(payload){
        const { logger } = this;
        logger.info(`starting subscribe from x-message-created`);

        let message, headers;
        try{
            message = JSON.parse(payload.content.toString());
            headers = payload.properties.headers;

            logger.info(`Payload: ${JSON.stringify(message)} \n Headers: ${JSON.stringify(headers)}`);
        }catch (e) {
            logger.error(e);
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