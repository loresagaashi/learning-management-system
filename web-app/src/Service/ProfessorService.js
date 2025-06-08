import axios from "axios";
import { BaseService } from "./BaseService";

export class ProfessorService extends BaseService {
  constructor() {
    super("/professors");
  }

  async getCoursesByProfessorId(professorId) {
    return this.client.get(`${this.requestMapping}/${professorId}/courses`);
  }
}

