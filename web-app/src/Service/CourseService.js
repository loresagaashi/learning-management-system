import { BaseService } from "./BaseService";

export class CourseService extends BaseService {
  constructor() {
    super("/courses");
  }

  async findBySemester(semesterName) {
    return this.client.get(`/by-semester?semesterName=${semesterName}`);
  }
  
  async getProfessorsByCourse(courseId) {
    return this.findById(`${courseId}/professors`);
  }

  async getStudentsByCourse(courseId) {
    return this.client.get(`${this.requestMapping}/${courseId}/students`);
  }
}