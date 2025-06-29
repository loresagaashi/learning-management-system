import { BaseService } from "./BaseService";

export class SubmissionService extends BaseService {
  constructor() {
    super("/submissions");
  }

  async findByStudentId(studentId) {
    return this.client.get(`${this.requestMapping}/student/${studentId}`);
  }
}