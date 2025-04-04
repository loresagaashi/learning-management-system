import { BaseService } from "./BaseService";

export class GradeService extends BaseService {
  constructor() {
    super("/grades");
  }
}