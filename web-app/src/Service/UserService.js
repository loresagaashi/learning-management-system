import { BaseService } from "./BaseService";
import { axiosInstance } from "./axiosInstance";

export class UserService extends BaseService {
  constructor() {
    super("/users");
  }

  async adminLogIn(body){
    try {
      return await axiosInstance.post('/auth/login', body);
    } catch (error) {
      throw { message: error }
      }
  }
  async studentLogIn(body){
    try {
      return await axiosInstance.post('/auth/login', body);
    } catch (error) {
      throw { message: error }
      }
  }
  async professorLogIn(body){
    try {
      return await axiosInstance.post('/auth/login', body);
    } catch (error) {
      throw { message: error }
      }
  }
  async clientLogIn(body){
    try {
      return await axiosInstance.post('/auth/login', body);
    } catch (error) {
      throw { message: error }
    }
  }
  refreshToken(body) {
    return axiosInstance.post(`/auth/refresh`, body);
  }
}