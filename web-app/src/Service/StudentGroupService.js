import { BaseService } from "./BaseService";

export class StudentGroupService extends BaseService {
  constructor() {
    super("/studentgroups");
  }
}