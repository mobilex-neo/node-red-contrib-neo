module.exports = function (RED) {
  function NeoWebhookInNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    RED.httpNode.post(`/neo-webhook/${config.endpoint}`, RED.bodyParser.json(), function (req, res) {
      const event = {
        headers: req.headers,
        payload: req.body
      };
      node.send({ payload: event });
      res.status(200).send({ status: 'ok' });
    });

    node.on('close', function () {
      // cleanup se necessário
    });
  }

  RED.nodes.registerType("neo-webhook-in", NeoWebhookInNode);
};
