// node-red-contrib-neo
// Este módulo implementa nós para conectar ao NEO Framework no Node-RED
const NeoClient = require('../../lib/neo-client');
const fetch = require('node-fetch');

module.exports = function (RED) {
    function NeoCallMethodNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.methodName = config.methodName;
        node.httpMethod = config.httpMethod || 'GET';
        node.payload = JSON.parse(config.payload) || msg.payload || {};

        node.on('input', async function (msg) {
            try {
                const client = new NeoClient(baseURL, token);
                const result = await client.callMethod(node.httpMethod, node.httpMethod, msg.payload);
                msg.payload = result;
                node.send(msg);
              } catch (err) {
                node.error("Erro ao consultar documentos: " + err.message);
              }
        });
    }
    RED.nodes.registerType("neo-call-method", NeoCallMethodNode);
};

