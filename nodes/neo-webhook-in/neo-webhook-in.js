const NeoClient = require('../../lib/neo-client');

module.exports = function (RED) {
  function NeoWatchDoctypeNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    const interval = parseInt(config.interval) || 30;
    let polling = null;
    let lastCheck = new Date().toISOString();

    function startPolling() {
      polling = setInterval(async () => {
        try {
          const client = new NeoClient(config.baseURL, config.token);
          const res = await client.query(config.doctype, [["modified", ">", lastCheck]]);
          lastCheck = new Date().toISOString();

          res.forEach(doc => {
            node.send({ payload: doc });
          });
        } catch (e) {
          node.error("Erro no watch-doctype: " + e.message);
        }
      }, interval * 1000);
    }

    startPolling();

    node.on("close", () => {
      if (polling) clearInterval(polling);
    });
  }

  RED.nodes.registerType("neo-watch-doctype", NeoWatchDoctypeNode);
};
