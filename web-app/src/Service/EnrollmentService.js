import { BaseService } from "./BaseService";

export class EnrollmentService extends BaseService {
    constructor() {
      super("/enrollment");
    }
  }