import { BaseService } from "./BaseService";

export class ProfessorService extends BaseService {
  constructor() {
    super("/professor");
  }
}