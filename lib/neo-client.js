const axios = require("axios");
const e = require("express");

class NeoClient {
  constructor(baseURL, auth = {}) {
    this.baseURL = baseURL;
    this.auth = auth; // { token: '', apiKey: '', apiSecret: '' }
    this.token = null;

    this.api = axios.create({ baseURL });

    this._applyAuthHeaders();
  }

  _applyAuthHeaders() {
    const headers = {};
 
    
    if (this.auth.apiKey && this.auth.apiSecret) {
      // API Key + Secret
      headers["Authorization"] = `token ${this.auth.apiKey}:${this.auth.apiSecret}`;
    }
    else if (this.auth.token) {
       // Cookie-based (session)
      headers["Cookie"] = this.auth.token;
    }

   
    this.api.defaults.headers = {
      ...this.api.defaults.headers,
      ...headers
    };
  }

  async login(username, password) {
    const res = await this.api.post("/api/method/login", {
      usr: username,
      pwd: password
    });

    this.token = res.headers["set-cookie"];
    this.auth.token = this.token;
    this._applyAuthHeaders();
    return this.token;
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
    return res.data;
  }

  async query(doctype, filters = {}, fields = []) {
    const params = {
      filters: JSON.stringify(filters)
    };

    if (fields.length) {
      params.fields = JSON.stringify(fields);
    }

    const res = await this.api.get(`/api/resource/${doctype}`, { params });
    return res.data.data;
  }

  async callMethod(method, path, args = {}) {
    let res = {};
    if(method === 'GET'){
      res = await this.api.get(`/api/method/${path}`, { params: args });
    }else if(method === 'POST'){
      res = await this.api.post(`/api/method/${path}`, JSON.stringify(args));
    }else if(method === 'PUT'){
      res = await this.api.put(`/api/method/${path}`, JSON.stringify(args));
    }else if(method === 'DELETE'){
      res = await this.api.delete(`/api/method/${path}`, JSON.stringify(args));
    }
    return res.data;
  }

  async submitDoc(doctype, name) {
    const res = await this.callMethod("frappe.client.submit", {
      doc: { doctype, name }
    });
    return res;
  }

  async applyWorkflow(doctype, name, action) {
    const res = await this.callMethod("frappe.model.workflow.apply_workflow", {
      doctype,
      docname: name,
      action
    });
    return res;
  }

  async searchLink(doctype, txt, filters = {}) {
    const res = await this.callMethod("frappe.desk.search.search_link", {
      doctype,
      txt,
      filters
    });
    return res;
  }
}

module.exports = NeoClient;
