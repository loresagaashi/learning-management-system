import { BaseService } from "./BaseService";

export class LectureService extends BaseService {
  constructor() {
    super("/lectures");  // matches backend controller @RequestMapping("/lectures")
  }

  // Get all lectures by courseId
  getLecturesByCourse(courseId) {
    // Assuming backend GET /lectures/course/{courseId}
    return this.client.get(`${this.requestMapping}/course/${courseId}`)
      .then(res => res.data);
  }

  // Create new lecture (example)
  createLecture(lectureData) {
    return this.client.post(this.requestMapping, lectureData)
      .then(res => res.data);
  }

  // Add other methods as needed...
}