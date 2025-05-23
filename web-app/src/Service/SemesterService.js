import { BaseService } from "./BaseService";

export class SemesterService extends BaseService {
    constructor() {
      super("/semester");
    }

}