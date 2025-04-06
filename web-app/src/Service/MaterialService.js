import axios from "axios";
import { BaseService } from "./BaseService";

export class MaterialService extends BaseService {
  constructor() {
    super("/materials");
  }

  async findAllWithLecture() {
    const response = await axios.get(`${this.baseUrl}/with-lecture`);
    return response.data;
  }

  async saveMaterialWithLecture(material, lectureId) {
    const response = await axios.post(`${this.baseUrl}/save`, material, {
      params: { lectureId }
    });
    return response.data;
  }
}