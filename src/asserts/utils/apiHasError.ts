import { APIError } from ' ../../api/auth';

export function hasError(response: any): response is APIError {
    return response && response.reason;
}
