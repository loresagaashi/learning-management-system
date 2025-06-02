import { BaseService } from "./BaseService";

export class StudentGroupService extends BaseService {
  constructor() {
    super("/student-groups");
  }
 async findAll() {
    const response = await fetch("http://localhost:8080/student-groups");
    if (!response.ok) throw new Error("Failed to fetch student groups");
    return await response.json();
  }

}