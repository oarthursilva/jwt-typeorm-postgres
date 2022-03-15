import Users from "../../models/entities/Users";

export type AuthenticateResponseType = {
  user: Users;
  token: string;
}
