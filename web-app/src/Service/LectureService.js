import { BaseService } from "./BaseService";

export class LectureService extends BaseService {
  constructor() {
    super("/lectures");
  }
}