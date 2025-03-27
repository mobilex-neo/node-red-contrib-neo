const NeoClient = require('../../lib/neo-client');

module.exports = function (RED) {
  function NeoQueryNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on('input', async function (msg) {
      const doctype = config.doctype || msg.doctype;
      const filters = JSON.parse(config.filters || msg.filters || '{}');
      const fields = JSON.parse(config.fields || msg.fields || '["name"]');
      const token = msg.neo?.token;
      const baseURL = config.baseURL || msg.neo?.baseURL;

      if (!doctype || !baseURL || !token) {
        node.error("Campos obrigatórios ausentes: doctype, token ou baseURL.");
        return;
      }

      try {
        const client = new NeoClient(baseURL, token);
        const result = await client.query(doctype, filters, fields);
        msg.payload = result;
        node.send(msg);
      } catch (err) {
        node.error("Erro ao consultar documentos: " + err.message);
      }
    });
  }

  RED.nodes.registerType("neo-query", NeoQueryNode);
};
