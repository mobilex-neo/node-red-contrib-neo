# node-red-contrib-neo

Nós personalizados para integrar o [NEO Framework](https://github.com/mobilex-neo) ao Node-RED.

Permite autenticar e realizar operações CRUD (Create, Read, Update, Delete), além de chamar métodos customizados via API REST do NEO.

## Recursos

- Autenticação via API Key
- Requisições REST a recursos do NEO (GET, POST, PUT, DELETE)
- Execução de métodos customizados (via `call_method`)

## Instalação

### Via Gerenciador do Node-RED

1. Acesse o Node-RED.
2. Clique em **Menu → Gerenciar Paleta → Instalar**.
3. Procure por `node-red-contrib-neo` e clique em **Instalar**.

### Via Terminal (Manual)

```bash
cd ~/.node-red
npm install node-red-contrib-neo
```

Reinicie o Node-RED após a instalação.

## Como Usar

### Nó: NEO Auth (`neo-auth`)

Autentica no NEO utilizando uma API Key e Secret. O resultado é um cabeçalho de sessão armazenado em `msg.session`.

**Inputs:**
- `msg` (ignorado)

**Outputs:**
- `msg.session` com cabeçalho de autorização
- `msg.payload.user` com o nome do usuário autenticado

### Nó: NEO Request (`neo-request`)

Realiza chamadas REST para recursos do NEO (por exemplo: `GET`, `POST`, `PUT`, `DELETE` em um `doctype`).

**Inputs:**
- `msg.session` (token de autenticação gerado pelo `neo-auth`)
- `msg.payload` (dados da requisição)

**Outputs:**
- `msg.payload` com a resposta da API

### Nó: NEO Call Method (`neo-call-method`)

Executa um método customizado exposto via `/api/method` no backend do NEO.

**Inputs:**
- `msg.session` (token de autenticação)
- `msg.payload` (dados da requisição - usado no POST)

**Outputs:**
- `msg.payload` com a resposta

## Exemplo de Fluxo

```text
[inject] → [neo-auth] → [function set msg.payload] → [neo-request] → [debug]
```

## Licença

MIT

## Autor

Desenvolvido por Luiz Carvalho / MTM Tecnologia

GitHub: [github.com/mobilex-neo](https://github.com/mobilex-neo)

