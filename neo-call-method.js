// node-red-contrib-neo
// Este módulo implementa nós para conectar ao NEO Framework no Node-RED

const fetch = require('node-fetch');

module.exports = function (RED) {
    function NeoCallMethodNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.methodName = config.methodName;
        node.httpMethod = config.httpMethod || 'GET';

        node.on('input', async function (msg) {
            try {
                const session = msg.session || {};
                const url = `${msg.uri || node.uri}/api/method/${node.methodName}`;
                const options = {
                    method: node.httpMethod,
                    headers: session,
                    body: node.httpMethod === 'POST' ? JSON.stringify(msg.payload) : null
                };
                const response = await fetch(url, options);
                const data = await response.json();
                msg.payload = data;
            } catch (error) {
                msg.payload = { error: error.message };
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("neo-call-method", NeoCallMethodNode);
};

