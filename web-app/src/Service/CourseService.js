import { BaseService } from "./BaseService";

export class CourseService extends BaseService {
  constructor() {
    super("/courses");
  }
}