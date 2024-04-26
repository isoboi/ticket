import { BaseModel } from "../common/base-model";

export interface Region extends BaseModel {
  parent_id: number,
  name: string,
}
