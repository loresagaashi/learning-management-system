import { BaseService } from "./BaseService";

export class ExamService extends BaseService {
  constructor() {
    super("/exams");
  }
}