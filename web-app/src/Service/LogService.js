import { BaseService } from "./BaseService";

export class LogService extends BaseService {
  constructor() {
    super("/logs");
  }
}