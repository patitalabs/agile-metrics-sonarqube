import * as axios from 'axios';
import { SonarClient } from './Types';

export class SonarClientImpl implements SonarClient {
  private readonly host: string;
  constructor({ host }) {
    this.host = host;
  }

  async getData(url: string): Promise<any> {
    const fullUrl = `${this.host}${url}`;

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await axios.default.get(fullUrl, config);
    const json = response.data;
    if (json.errors) {
      throw new Error(...json.errors);
    }
    return json;
  }
}
