import { BaseService } from "./BaseService";

export class EmailService extends BaseService {
  constructor() {
    super("/emails/sendEmail");
  }
}