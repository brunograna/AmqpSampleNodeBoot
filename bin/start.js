const NodeBoot = require('nodejs-boot');

const nodeBoot = new NodeBoot();

nodeBoot.start().then(()=>{
    nodeBoot.container.resolve("sampleInboundBroker").listenForResults();
});

