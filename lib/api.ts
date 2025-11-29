const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')

export const apiUrl = (path: string) => `${BASE_URL}${path}`