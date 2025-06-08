import axios from "axios";
import { BaseService } from "./BaseService";

export class ReportService extends BaseService {
  constructor() {
    super("/reports");
  }
  async saveReportWithStudent(report) {
    const response = await axios.post(`${this.baseUrl}/save`, report);
    return response.data;
  }
}