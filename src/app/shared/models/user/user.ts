import { BaseModel } from '../common/base-model'

export interface User extends BaseModel {
  first_name: string,
  last_name: string,
  patronymic: string,
  username: string,
  email: string,
  email_verified_at: string,
  date_of_birth: string,
  area_id: number,
}
