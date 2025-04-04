import { BaseService } from "./BaseService";

export class AssignmentService extends BaseService {
  constructor() {
    super("/assignments");
  }
}
