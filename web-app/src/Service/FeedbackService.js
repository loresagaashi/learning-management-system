import { BaseService } from "./BaseService";

export class FeedbackService extends BaseService {
    constructor() {
      super("/feedbacks");
    }
  }