import { BaseService } from "./BaseService";

export class SubmissionService extends BaseService {
  constructor() {
    super("/submission");
  }
}