import axios from "axios";
import { BaseService } from "./BaseService";

export class LogService extends BaseService {
  constructor() {
    super("/logs");
  }
  async saveLogWithStudentAndProfessor(log) {
    const response = await axios.post(`${this.baseUrl}/save`, log);
    return response.data;
  }
  
}