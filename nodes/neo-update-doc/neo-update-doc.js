const NeoClient = require('../../lib/neo-client');

module.exports = function (RED) {
  function NeoUpdateDocNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on('input', async function (msg) {
      const doctype = config.doctype || msg.doctype;
      const docname = config.docname || msg.docname;
      const data = msg.payload;
      const token = msg.neo?.token;
      const baseURL = config.baseURL || msg.neo?.baseURL;

      if (!doctype || !docname || !data || !baseURL || !token) {
        node.error("Campos obrigatórios ausentes: doctype, name, payload, token ou baseURL.");
        return;
      }

      try {
        const client = new NeoClient(baseURL, token);
        const doc = await client.updateDoc(doctype, docname, data);
        msg.payload = doc;
        node.send(msg);
      } catch (err) {
        node.error("Erro ao atualizar documento: " + err.message);
      }
    });
  }

  RED.nodes.registerType("neo-update-doc", NeoUpdateDocNode);
};
