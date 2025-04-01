import { BaseService } from "./BaseService";

export class OrientationService extends BaseService {
  constructor() {
    super("/orientations");
  }
}