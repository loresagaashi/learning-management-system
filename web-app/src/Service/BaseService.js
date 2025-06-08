import { axiosInstance } from "./axiosInstance";

export class BaseService {
  client;
  requestMapping = "";

  constructor(requestMapping) {
    this.client = axiosInstance;
    this.requestMapping = requestMapping;
  }

  create(data) {
    return this.client.post(this.requestMapping, data);
  }

  update(data) {
    return this.client.put(this.requestMapping, data);
  }

  findAll() {
    return this.client.get(`${this.requestMapping}/all`);
  }

  findById(id) {
    return this.client.get(`${this.requestMapping}/${id}`);
  }

  delete(id) {
    return this.client.delete(`${this.requestMapping}/${id}`);
  }
  validateOnCreate(data) {
    return axiosInstance.post(`${this.requestMapping}/validate`, data);
  }
  validateOnUpdate(data) {
    return axiosInstance.put(`${this.requestMapping}/validate`, data);
  }
  
}