// node-red-contrib-neo
// Este módulo implementa nós para conectar ao NEO Framework no Node-RED

const fetch = require('node-fetch');

module.exports = function (RED) {
    function NeoAuthNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.apiKey = config.apiKey;
        node.apiSecret = config.apiSecret;
        node.uri = config.uri;
        
        node.on('input', async function (msg) {
            try {
                const authHeaders = {
                    'Authorization': `token ${node.apiKey}:${node.apiSecret}`
                };
                const response = await fetch(`${node.uri}/api/method/get_auth_user`, {
                    method: 'GET',
                    headers: authHeaders
                });
                const data = await response.json();
                
                if (data.data && data.data.user !== 'Gest') {
                    msg.session = authHeaders;
                    msg.neoInstance = `${node.uri}`;
                    msg.payload = { user: data.data.user, uri:`${node.uri}` };
                } else {
                    msg.payload = { error: 'Invalid Credentials' };
                }
            } catch (error) {
                msg.payload = { error: error.message };
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("neo-auth", NeoAuthNode);
};
