import { BaseService } from "./BaseService";

export class AssignmentService extends BaseService {
  constructor() {
    super("/assignments");
  }

  async findByCourseId(courseId) {
    return this.client.get(`${this.requestMapping}/course/${courseId}`);
  }

  async getAssignmentSubmissionsForGrading(assignmentId) {
    return this.client.get(`${this.requestMapping}/${assignmentId}/submissions-for-grading`);
  }

  async gradeAssignment(assignmentId, studentId, grade) {
    return this.client.post(`${this.requestMapping}/grade`, {
      assignmentId,
      studentId,
      grade
    });
  }

  async getAssignmentGrades(assignmentId) {
    return this.client.get(`${this.requestMapping}/${assignmentId}/grades`);
  }

  async getStudentAssignmentGrade(assignmentId, studentId) {
    return this.client.get(`${this.requestMapping}/${assignmentId}/student/${studentId}/grade`);
  }
}
