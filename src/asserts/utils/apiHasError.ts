import { APIError } from ' ../../api/auth';

export function hasError(response: any): response is APIError {
    console.log('hasError', response && response.reason)
    return response && response.reason;
}
