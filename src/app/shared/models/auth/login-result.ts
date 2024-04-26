import { User } from "../user/user";

export interface LoginResult {
  access_token: string
  user: User
}
