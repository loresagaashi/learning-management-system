import { BaseService } from "./BaseService";

export class ReportService extends BaseService {
  constructor() {
    super("/reports");
  }
}