const NeoClient = require('../../lib/neo-client');

module.exports = function (RED) {
  function NeoDeleteDocNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on('input', async function (msg) {
      const doctype = config.doctype || msg.doctype;
      const docname = config.docname || msg.docname;
      const token = msg.neo?.token;
      const baseURL = config.baseURL || msg.neo?.baseURL;

      if (!doctype || !docname || !baseURL || !token) {
        node.error("Campos obrigatórios ausentes: doctype, name, token ou baseURL.");
        return;
      }

      try {
        const client = new NeoClient(baseURL, token);
        const result = await client.deleteDoc(doctype, docname);
        msg.payload = result;
        node.send(msg);
      } catch (err) {
        node.error("Erro ao deletar documento: " + err.message);
      }
    });
  }

  RED.nodes.registerType("neo-delete-doc", NeoDeleteDocNode);
};
