import { TypedForm } from "../common/typed-form";
import { User } from "./user";

export type UserForm = TypedForm<Partial<Omit<User, 'patronymic' | 'email' | 'email_verified_at'>>>
