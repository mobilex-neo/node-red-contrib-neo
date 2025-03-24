const NeoClient = require('../../lib/neo-client');

module.exports = function (RED) {
  function NeoWorkflowActionNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on('input', async function (msg) {
      const doctype = config.doctype || msg.doctype;
      const docname = config.name || msg.name;
      const action = config.action || msg.action;
      const token = msg.neo?.token;
      const baseURL = config.baseURL || msg.neo?.baseURL;

      if (!doctype || !docname || !action || !baseURL || !token) {
        node.error("Campos obrigatórios ausentes: doctype, name, action, token ou baseURL.");
        return;
      }

      try {
        const client = new NeoClient(baseURL, token);
        const result = await client.callMethod("frappe.model.workflow.apply_workflow", {
          doctype,
          docname,
          action
        });
        msg.payload = result;
        node.send(msg);
      } catch (err) {
        node.error("Erro ao aplicar ação de workflow: " + err.message);
      }
    });
  }

  RED.nodes.registerType("neo-workflow-action", NeoWorkflowActionNode);
};
