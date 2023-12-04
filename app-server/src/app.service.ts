import { Injectable } from '@nestjs/common'
import { ApiRequestDetails } from '@shared/interfaces/ApiRequestDetails'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  async getRequestDetails(requestId: string): Promise<ApiRequestDetails> {
    const time = new Date().toISOString()
    await new Promise(resolve => setTimeout(resolve, 3000))
    return {
      time,
      requestId: requestId
    }
  }
}
