import { BaseService } from "./BaseService";

export class GenerationService extends BaseService {
  constructor() {
    super("/generations");
  }
}