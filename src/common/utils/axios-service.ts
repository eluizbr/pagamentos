import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export default class AxiosService {
  private service;

  constructor() {
    this.instance();
  }

  private async instance() {
    this.service = axios.create({ baseURL: process.env.VAULT_URL });
    this.service.defaults.headers['X-Vault-Token'] = process.env.VAULT_TOKEN;
    return this.service;
  }

  async post(url: any, data: any) {
    const result = await this.service.post(url, data);
    return { token: result.data.request_id };
  }
}
