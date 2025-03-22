module.exports = function (RED) {
    function NeoHookListenerNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.accessKey = config.accessKey;
        node.methodName = config.methodName;

        // Criação do servidor HTTP para escutar os hooks
        node.server = RED.httpNode;
        
        // Rota dinâmica com base no methodName
        node.server.post(`/neo-hook/${node.methodName}`, (req, res) => {
            const receivedKey = req.headers['x-neo-key']; // Chave de autenticação vinda do hook
            
            if (receivedKey !== node.accessKey) {
                res.status(403).send({ error: "Invalid Access Key" });
                return;
            }
            
            const payload = req.body;
            
            // Envia os dados recebidos para o fluxo Node-RED
            node.send({ payload });
            res.status(200).send({ message: "Hook received successfully" });
        });
    }
    
    RED.nodes.registerType("neo-hook-listener", NeoHookListenerNode);
};
