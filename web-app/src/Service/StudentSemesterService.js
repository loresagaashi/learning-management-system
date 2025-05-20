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

}