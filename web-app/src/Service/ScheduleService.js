import { BaseService } from "./BaseService";

export class ScheduleService extends BaseService {
    constructor() {
      super("/schedules");
    }
  }