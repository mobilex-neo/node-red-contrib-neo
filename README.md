# NEO mobileX Code-Flow package

**node-red-contrib-neo** é um conjunto de nós para o **Node-RED**, permitindo integração direta com a plataforma **NEO Framework**. 

## Instalação 

Para instalar diretamente via Node-RED, acesse o menu **Gerenciar Paleta** e procure por: 

```
node-red-contrib-neo 
``` 

Ou instale manualmente via terminal: 

```sh 
cd ~/.node-red npm install 
node-red-contrib-neo 
``` 

Se estiver utilizando um pacote local: 

```sh
cd ~/.node-red 
npm install /caminho/para/seu/pacote/node-red-contrib-neo
``` 

Após a instalação, reinicie o Node-RED: 

```sh 
node-red-stop 
node-red-start 
``` 

## Configuração dos Nós

Os seguintes nós estão disponíveis: 

### 1️⃣ **Autenticação (`neo-auth`)** 

Realiza autenticação com a plataforma NEO. 

| Campo | Descrição | 
|-------------|----------| 
| **Base URL** | URL da instância do NEO | 
| **Tipo de Autenticação** | `login` ou `apikey` | 
| **Usuário** | (Caso `login`) Nome de usuário | 
| **Senha** | (Caso `login`) Senha do usuário | 
| **API Key** | (Caso `apikey`) Chave da API | 
| **API Secret** | (Caso `apikey`) Segredo da API | 

### 2️⃣ **Obter Documento (`neo-get-doc`)** 

Recupera um documento específico de um **Doctype**. 

| Campo | Descrição | 
|-------------|----------| 
| **Doctype** | Nome do Doctype a ser consultado | 
| **Nome do Documento** | Identificador do documento |

### 3️⃣ **Criar Documento (`neo-create-doc`)** 
 
Cria um novo documento em um Doctype. 
 
| Campo | Descrição | 
|-------------|----------| 
| **Doctype** | Nome do Doctype | 
| **Payload** | Dados do documento em formato JSON | 
 
### 4️⃣ **Atualizar Documento (`neo-update-doc`)**
 
Atualiza um documento existente. 

| Campo | Descrição | 
|-------------|----------| 
| **Doctype** | Nome do Doctype | 
| **Nome do Documento** | ID do documento | 
| **Payload** | Dados a serem atualizados | 
 
### 5️⃣ **Deletar Documento (`neo-delete-doc`)**
 
Exclui um documento do sistema. 
 
| Campo | Descrição | 
|-------------|----------| 
| **Doctype** | Nome do Doctype | 
| **Nome do Documento** | ID do documento | 
 
### 6️⃣ **Consultar (`neo-query`)** 
 
Realiza queries na base do NEO Framework. 
 
| Campo | Descrição | 
|-------------|----------| 
| **Query** | Filtro em formato JSON para busca | 
 
### 7️⃣ **Submeter Documento (`neo-submit-doc`)** 
 
Submete um documento para workflow. 
 
| Campo | Descrição | 
|-------------|----------| 
| **Doctype** | Nome do Doctype | 
| **Nome do Documento** | ID do documento | 
 
### 8️⃣ **Ação de Workflow (`neo-workflow-action`)** 
 
Executa uma ação de workflow em um documento. 
 
| Campo | Descrição | 
|-------------|----------| 
| **Doctype** | Nome do Doctype | 
| **Nome do Documento** | ID do documento | 
| **Ação** | Nome da ação a ser executada | 
 
### 9️⃣ **Webhook (`neo-webhook-in`)** 
 
Recebe requisições via Webhook e aciona um fluxo no Node-RED. 
 
| Campo | Descrição |
|-------------|----------| 
| **Endpoint** | URL onde o webhook receberá chamadas | 
 
### 🔟 **Monitoramento de Doctype (`neo-watch-doctype`)** 
 
Fica "escutando" mudanças em um Doctype e aciona fluxos automaticamente. 
 
| Campo | Descrição | 
|-------------|----------| 
| **Doctype** | Nome do Doctype a ser monitorado | 
 
## Exemplo de Uso 
 
1. **Autenticar** com o `neo-auth` 
 
2. **Obter um documento** usando `neo-get-doc` 
 
3. **Atualizar o documento** com `neo-update-doc` 
 
4. **Submeter o documento** com `neo-submit-doc` 
 
5. **Monitorar mudanças** com `neo-watch-doctype` 
 
### **Exemplo de fluxo no Node-RED** 
 
```json 
[
    {
        "id": "auth-node",
        "type": "neo-auth",
        "z": "8959adaf4ee2f633",
        "name": "Autenticação NEO",
        "baseURL": "https://neo.mobilex.tech",
        "authType": "apikey",
        "username": "",
        "password": "",
        "apiKey": "0ce3c3b3c35338",
        "apiSecret": "550ba4334c6347d",
        "x": 390,
        "y": 40,
        "wires": [
            [
                "get-doc-node"
            ]
        ]
    },
    {
        "id": "get-doc-node",
        "type": "neo-get-doc",
        "z": "8959adaf4ee2f633",
        "name": "Buscar Documento",
        "doctype": "User",
        "docname": "guest",
        "baseURL": "https://neo.mobilex.tech",
        "x": 610,
        "y": 40,
        "wires": [
            [
                "772eabb85a0fad44"
            ]
        ]
    },
    {
        "id": "update-doc-node",
        "type": "neo-update-doc",
        "z": "8959adaf4ee2f633",
        "name": "Atualizar Cliente",
        "doctype": "User",
        "docname": "guest",
        "baseURL": "https://neo.mobilex.tech",
        "x": 580,
        "y": 160,
        "wires": [
            [
                "1743336da241660d"
            ]
        ]
    },
    {
        "id": "a1a104e2408dba02",
        "type": "inject",
        "z": "8959adaf4ee2f633",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 160,
        "y": 40,
        "wires": [
            [
                "auth-node"
            ]
        ]
    },
    {
        "id": "1743336da241660d",
        "type": "debug",
        "z": "8959adaf4ee2f633",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 800,
        "y": 160,
        "wires": []
    },
    {
        "id": "772eabb85a0fad44",
        "type": "function",
        "z": "8959adaf4ee2f633",
        "name": "function 1",
        "func": "msg.payload['middle_name']='TESTE';\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 100,
        "wires": [
            [
                "update-doc-node"
            ]
        ]
    }
] 
``` 
 
## **Erros Comuns e Soluções** 
 
| Erro | Possível Causa | Solução | 
|------|--------------|---------| 
| `MODULE_NOT_FOUND` | Dependências não instaladas | Execute `npm install` no diretório do projeto | 
| Inputs não aparecem | Problema no HTML dos nós | Verifique se `node-input-<campo>` está corretamente definido | 
| Fluxo não funciona | Problema de autenticação | Certifique-se de que a URL, usuário e senha estão corretos | 
 
## Contribuição 
 
Se quiser contribuir, faça um fork do projeto e envie um Pull Request! 
 
```sh 
 git clone https://github.com/mobilex-neo/node-red-contrib-neo.git 
 cd node-red-contrib-neo 
 npm install
``` 

 
## Licença

Este projeto é licenciado sob a licença **MIT**. 

---

**Desenvolvido por mobileX para integração com NEO Framework.**