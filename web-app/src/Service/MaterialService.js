import axios from "axios";
import { BaseService } from "./BaseService";

export class MaterialService extends BaseService {
  constructor() {
    super("/materials");
  }

  async saveMaterialWithLecture(material) {
    const response = await axios.post(`${this.baseUrl}/save`, material);
    return response.data;
  }
}