const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const apiUrl = (path: string) => `${BASE_URL}${path}`