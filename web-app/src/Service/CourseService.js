import { BaseService } from "./BaseService";

export class CourseService extends BaseService {
  constructor() {
    super("/courses");
  }

  async findBySemester(semesterName) {
    return this.client.get(`/by-semester?semesterName=${semesterName}`);
  }
}