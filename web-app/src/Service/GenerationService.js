import { BaseService } from "./BaseService";

export class GenerationService extends BaseService {
  constructor() {
    super("/generations");
  }

  findByDegreeType(degreeType) {
    return this.client.get(`${this.requestMapping}/by-degree-type`, {
      params: { type: degreeType },
    });
  }
}
