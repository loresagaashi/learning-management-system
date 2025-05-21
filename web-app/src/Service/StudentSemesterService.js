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
getSemestersByStudentId(studentId) {
    return this.client.get(`${this.requestMapping}/get-student-semesters`, {
      params: { studentId },
    });
  }
}