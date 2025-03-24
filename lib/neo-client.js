const axios = require('axios');

class NeoClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = null;
    this.api = axios.create({ baseURL });
  }

  async login(username, password) {
    const res = await this.api.post('/api/method/login', { usr: username, pwd: password });
    this.token = res.headers['set-cookie'];
    this.api.defaults.headers.Cookie = this.token;
  }

  async getDoc(doctype, name) {
    const res = await this.api.get(`/api/resource/${doctype}/${name}`);
    return res.data.data;
  }

  async createDoc(doctype, data) {
    const res = await this.api.post(`/api/resource/${doctype}`, data);
    return res.data.data;
  }

  async updateDoc(doctype, name, data) {
    const res = await this.api.put(`/api/resource/${doctype}/${name}`, data);
    return res.data.data;
  }
  async deleteDoc(doctype, name) {
    const res = await this.api.delete(`/api/resource/${doctype}/${name}`);
    return res.data.data;
  }
  async submitDoc(doctype, name){
    const res = await this.api.post(`/api/resource/${doctype}/${name}/submit`);
    return res.data.data;
  }
}

module.exports = NeoClient;
