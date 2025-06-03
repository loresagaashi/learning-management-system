import { BaseService } from "./BaseService";

export class SemesterService extends BaseService {
    constructor() {
      super("/semester");
    }


    findByGenerationName(generationName) {
      console.log(`SemesterService.findByGenerationName called with generationName: '${generationName}'`);
      if (!generationName || typeof generationName !== 'string') {
        console.error("❌ SemesterService.findByGenerationName: generationName is invalid:", generationName);
        return Promise.reject(new Error("Invalid generationName provided to findByGenerationName."));
      }
      return this.client
        .get(`${this.requestMapping}/by-generation`, { params: { generationName } })
        .then(res => {
          console.log(`✅ Response received in .then() from GET /semester/by-generation?generationName=${generationName}:`, res);
          // Assuming 'res' is the actual data array based on previous log
          return res;
        })
        .catch(err => {
          console.error(`❌ Error in SemesterService.findByGenerationName for '${generationName}':`, err.response?.data || err.message, err.config);
          throw err;
        });
    }

async findAll() {
    const response = await fetch("http://localhost:8080/semester");
    if (!response.ok) throw new Error("Failed to fetch semester");
    return await response.json();
  }
  findByGenerationId(id) { // Renamed param to 'id' for clarity, should be a primitive
    console.log(`SemesterService.findByGenerationId called with id: '${id}'`);
    if (id === null || id === undefined || typeof id === 'object') {
        console.error("❌ SemesterService.findByGenerationId: id is invalid (null, undefined, or object):", id);
        return Promise.reject(new Error("Invalid ID provided to findByGenerationId. Must be a primitive value."));
    }
    // Backend endpoint: @GetMapping("/by-generation/{generationId}")
    return this.client.get(`${this.requestMapping}/by-generation/${id}`)
      .then(res => {
        console.log(`✅ Response from GET /semester/by-generation/${id}:`, res.data);
        return res.data;
      })
      .catch(err => {
        console.error(`❌ Error in SemesterService.findByGenerationId for id '${id}':`, err.response?.data || err.message, err.config);
        throw err;
      });
  }

}
