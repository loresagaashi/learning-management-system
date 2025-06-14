import axios from "axios";
import { BaseService } from "./BaseService";

export class MaterialService extends BaseService {
  constructor() {
    super("/materials");
  }

  async uploadMaterial(formData) {
    return this.client.post(`${this.requestMapping}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async saveMaterialWithLecture(material) {
    const response = await axios.post(`${this.baseUrl}/save`, material);
    return response.data;
  }
}