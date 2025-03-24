const NeoClient = require('../../lib/neo-client');

module.exports = function (RED) {
  function NeoCreateDocNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on('input', async function (msg) {
      const doctype = config.doctype || msg.doctype;
      const data = msg.payload;
      const token = msg.neo?.token;
      const baseURL = config.baseURL || msg.neo?.baseURL;

      if (!doctype || !data || !baseURL || !token) {
        node.error("Campos obrigatórios ausentes: doctype, payload, token ou baseURL.");
        return;
      }

      try {
        const client = new NeoClient(baseURL, token);
        const doc = await client.createDoc(doctype, data);
        msg.payload = doc;
        node.send(msg);
      } catch (err) {
        node.error("Erro ao criar documento: " + err.message);
      }
    });
  }

  RED.nodes.registerType("neo-create-doc", NeoCreateDocNode);
};
