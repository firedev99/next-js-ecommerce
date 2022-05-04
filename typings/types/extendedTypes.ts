export interface CustomError extends TypeError {
  success: boolean
  status: number
}
