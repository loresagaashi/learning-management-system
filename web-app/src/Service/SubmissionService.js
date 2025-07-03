import { BaseService } from "./BaseService";

export class SubmissionService extends BaseService {
  constructor() {
    super("/submissions");
  }

  async findByStudentId(studentId) {
    const response = await this.client.get(`${this.requestMapping}/student/${studentId}`);
    return response.data;
  }

  async uploadSubmission(formData) {
    const response = await this.client.post(`${this.requestMapping}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}