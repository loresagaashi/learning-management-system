import { BaseService } from "./BaseService";

export class StudentService extends BaseService {
  constructor() {
    super("/students");
  }
}