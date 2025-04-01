import { BaseService } from "./BaseService";

export class MaterialService extends BaseService {
  constructor() {
    super("/materials");
  }
}