import { BaseService } from "./BaseService";

export class AssignmentService extends BaseService {
  constructor() {
    super("/assignments");
  }

  async findByCourseId(courseId) {
    return this.client.get(`${this.requestMapping}/course/${courseId}`);
  }
}
