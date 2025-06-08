import { BaseService } from "./BaseService";

export class LectureService extends BaseService {
  constructor() {
    super("/lectures");
  }

  async createLecture(lectureData) {
    return this.post('', lectureData);
  }

  async updateLecture(lectureId, lectureData) {
    return this.put(`/${lectureId}`, lectureData);
  }

  async deleteLecture(lectureId) {
    return this.delete(`/${lectureId}`);
  }

  async getLecturesByCourse(courseId) {
    return this.get(`/course/${courseId}`);
  }
}