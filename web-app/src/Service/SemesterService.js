import { BaseService } from "./BaseService";

export class SemesterService extends BaseService {
    constructor() {
      super("/semester");
    }


    findByGenerationName(generationName) {
  return this.client
    .post(`${this.requestMapping}/by-generation`, { generationName })
    .then(res => {
      console.log("✅ Full response from /semester/by-generation:", res.data);
      return res.data; // ruaje kështu, por shih çfarë printon
    });
}

async findAll() {
    const response = await fetch("http://localhost:8080/semester");
    if (!response.ok) throw new Error("Failed to fetch semester");
    return await response.json();
  }


}


