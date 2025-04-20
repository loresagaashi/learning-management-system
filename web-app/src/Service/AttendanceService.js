import { BaseService } from "./BaseService";

export class AttendanceService extends BaseService {
  constructor() {
    super("/attendances");
  }
}
