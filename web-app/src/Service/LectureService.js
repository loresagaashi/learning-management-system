import { BaseService } from "./BaseService";

export class LectureService extends BaseService {
  constructor() {
    super("/lectures");
  }

  // Get all lectures by courseId
  getLecturesByCourse(courseId) {
    return this.client.get(`${this.requestMapping}/course/${courseId}`)
      .then(res => res.data);
  }

  // Create new lecture with course association
  createLecture(lectureData) {
    return this.client.post(`${this.requestMapping}/create`, lectureData)
      .then(res => res.data);
  }

  // Update existing lecture
  updateLecture(lectureData) {
    return this.client.put(`${this.requestMapping}/${lectureData.id}`, lectureData)
      .then(res => res.data);
  }

  // Delete lecture
  deleteLecture(lectureId) {
    return this.client.delete(`${this.requestMapping}/${lectureId}`)
      .then(res => res.data);
  }
}



