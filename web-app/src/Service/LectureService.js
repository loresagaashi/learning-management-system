import { BaseService } from "./BaseService";

export class LectureService extends BaseService {
  constructor() {
    super("/lectures");  // matches backend controller @RequestMapping("/lectures")
  }

  // Get all lectures by courseId
  getLecturesByCourse(courseId) {
    console.log('LectureService: Fetching lectures for courseId:', courseId);
    
    // Try the course-based endpoint first since it might be more reliable
    return this.client.get(`/courses/${courseId}/lectures`)
      .then(res => {
        console.log('LectureService: Course endpoint response:', res);
        console.log('LectureService: Course endpoint data:', res.data);
        // Handle case where response is direct array or wrapped in data
        return res.data || res;
      })
      .catch(error => {
        console.error('LectureService: Course endpoint failed:', error);
        // Try the lecture-based endpoint as fallback
        console.log('LectureService: Trying lecture endpoint as fallback...');
        return this.client.get(`${this.requestMapping}/course/${courseId}`)
          .then(res => {
            console.log('LectureService: Lecture endpoint response:', res);
            console.log('LectureService: Lecture endpoint data:', res.data);
            // Handle case where response is direct array or wrapped in data
            return res.data || res;
          })
          .catch(altError => {
            console.error('LectureService: Both endpoints failed:', altError);
            throw error; // Throw original error
          });
      });
  }

  // Create new lecture (example)
  createLecture(lectureData) {
    console.log('LectureService: Creating lecture with data:', lectureData);
    return this.client.post(`${this.requestMapping}/create-with-course`, lectureData)
      .then(res => {
        console.log('LectureService: Create lecture response:', res);
        console.log('LectureService: Create lecture data:', res.data);
        // Handle case where response is direct object or wrapped in data
        return res.data || res;
      })
      .catch(error => {
        console.error('LectureService: Error creating lecture:', error);
        console.error('LectureService: Create error response:', error.response);
        throw error;
      });
  }

  // Get a single lecture by ID
  getLectureById(lectureId) {
    console.log('LectureService: Fetching lecture by ID:', lectureId);
    return this.client.get(`${this.requestMapping}/${lectureId}`)
      .then(res => {
        console.log('LectureService: Get lecture by ID response:', res);
        console.log('LectureService: Get lecture by ID data:', res.data);
        return res.data || res;
      })
      .catch(error => {
        console.error('LectureService: Error fetching lecture by ID:', error);
        throw error;
      });
  }

  // Update lecture
  update(lectureData) {
    console.log('LectureService: Updating lecture with data:', lectureData);
    return this.client.put(`${this.requestMapping}`, lectureData)
      .then(res => {
        console.log('LectureService: Update lecture response:', res);
        console.log('LectureService: Update lecture data:', res.data);
        return res.data || res;
      })
      .catch(error => {
        console.error('LectureService: Error updating lecture:', error);
        console.error('LectureService: Update error response:', error.response);
        throw error;
      });
  }

  // Create lecture
  create(lectureData) {
    console.log('LectureService: Creating lecture with data:', lectureData);
    return this.client.post(`${this.requestMapping}`, lectureData)
      .then(res => {
        console.log('LectureService: Create lecture response:', res);
        console.log('LectureService: Create lecture data:', res.data);
        return res.data || res;
      })
      .catch(error => {
        console.error('LectureService: Error creating lecture:', error);
        console.error('LectureService: Create error response:', error.response);
        throw error;
      });
  }

  async createLectureWithMaterials(formData) {
    return this.client.post(`${this.requestMapping}/create-with-materials`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadMaterial(formData) {
    return this.client.post(`${this.requestMapping}/upload-material`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadMaterialForLecture(formData) {
    console.log('LectureService: Uploading material for lecture with formData:', formData);
    return this.client.post(`/materials/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async getMaterialsByLecture(lectureId) {
    return this.client.get(`${this.requestMapping}/${lectureId}/materials`);
  }

  // Add other methods as needed...
}