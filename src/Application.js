module.exports = {
    node_boot: {
        modules: {
            middlewares: "src/inbound/http/middlewares/**/*.js",
            controllers: "src/inbound/http/controllers/**/*.js",
            outboundBrokers: "src/outbound/amqp/**/*.js",
            inboundBrokers: "src/inbound/amqp/**/*.js",
        },
    },
    server: {
        port: process.env.PORT || 9000
    },
    amqp: {
        verbose: true,
        rabbitmq: {
            connection_string: "amqp://user:pass@localhost:5672",
            bindings: [
                {
                    exchange : {
                        name : "x-message-created",
                        type: "fanout",
                        options: {
                            durable: true,
                        },
                    },
                    queues : [
                        {
                            name: "x-message-created.q-message-created",
                            routingKey: "created",
                            options: {
                                durable: true,
                            },
                        },
                    ]
                },
            ]
        },
        azure_service_bus: {
            connection_string: "",
            bindings: [
                {
                    topic : {
                        name : "x-message-created",
                        options: {
                        },
                    },
                    subscriptions : [
                        {
                            name: "x-message-created.q-message-created",
                            routingKey: "created",
                            options: {
                            },
                        },
                    ]
                }
            ]
        }
    }
};