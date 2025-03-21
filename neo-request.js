// node-red-contrib-neo
// Este módulo implementa nós para conectar ao NEO Framework no Node-RED

const fetch = require('node-fetch');

module.exports = function (RED) {

    function NeoRequestNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.method = config.method;
        node.doctype = config.doctype;
        node.docname = config.docname;
        node.on('input', async function (msg) {
            try {
                const session = msg.session || {};
                let url = `${msg.neoInstance || node.uri}/api/resource/${node.doctype}`;
                if (node.docname) url += `/${node.docname}`;
                const options = {
                    method: node.method,
                    headers: session,
                    body: node.method === 'POST' || node.method === 'PUT' ? JSON.stringify(msg.payload) : null
                };
                const response = await fetch(url, options);
                const data = await response.json();
                msg.payload = data.data;
            } catch (error) {
                msg.payload = { error: error.message };
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("neo-request", NeoRequestNode);

};
