import { NextApiRequest } from "next"
// model interface
import { IUser } from "../../models/userModel"

// API types with custom params
// custom request param with user interface
export type CustomReqWithUser = NextApiRequest & {
  user?: IUser
}

// custom request param for generic type with custom body properties or data
export interface CustomReqWithProps<T> extends NextApiRequest {
  body: T
}

// custom request param for generic type type user information along with custom body
export interface CustomReqWithUserBody<T> extends CustomReqWithUser {
  body: T
}
