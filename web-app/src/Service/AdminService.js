import { BaseService } from "./BaseService";

export class AdminService extends BaseService {
  constructor() {
    super("/admins");
  }
}
