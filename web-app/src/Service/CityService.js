import { BaseService } from "./BaseService";

export class CityService extends BaseService {
  constructor() {
    super("/cities");
  }
}