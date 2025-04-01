import { BaseService } from "./BaseService";

export class PaymentService extends BaseService {
  constructor() {
    super("/payments");
  }
}