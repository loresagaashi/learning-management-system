import { BaseService } from "./BaseService";

export class StudentSemesterService extends BaseService {
  constructor() {
    super("/student-semester");
  }
register(studentId, semesterId) {
  return this.client.post(`${this.requestMapping}/register`, null, {
    params: { studentId, semesterId }
  });
}
  findByStudentId(studentId) {
    return this.client.get(`${this.requestMapping}/semesters-by-studentId`, {
      params: { studentId }
    });
  }
}