const NeoClient = require('../../lib/neo-client');

module.exports = function (RED) {
  function NeoAuthNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", async function (msg) {
      const baseURL = config.baseURL || msg.neo?.baseURL;
      const authType = config.authType || msg.neo?.authType || "login";

      if (!baseURL) {
        node.error("Base URL não informada.");
        return;
      }

      let client;
      try {
        if (authType === "apikey") {
          const apiKey = config.apiKey || msg.neo?.apiKey;
          const apiSecret = config.apiSecret || msg.neo?.apiSecret;

          if (!apiKey || !apiSecret) {
            throw new Error("API Key e Secret são obrigatórios.");
          }

          client = new NeoClient(baseURL, { apiKey, apiSecret });
        } else {
          const username = config.username || msg.neo?.username || msg.payload?.usr;
          const password = config.password || msg.neo?.password || msg.payload?.pwd;

          if (!username || !password) {
            throw new Error("Usuário e senha são obrigatórios.");
          }

          client = new NeoClient(baseURL);
          await client.login(username, password);
        }

        msg.neo = {
          token: client.token,
          client,
          baseURL,
          authType
        };

        node.send(msg);
      } catch (err) {
        node.error("Erro na autenticação NEO: " + err.message);
      }
    });
  }

  RED.nodes.registerType("neo-auth", NeoAuthNode);
};
