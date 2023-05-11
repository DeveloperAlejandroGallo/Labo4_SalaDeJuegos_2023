export type Rol = 'SUSCRIPTOR' | 'ADMIN'

export class User {
    name: string;
    password: string;

    /**
     *
     */
    constructor(_name:string, _pass:string) {
        this.name=_name;
        this.password = _pass;
    }
}

export interface UserResponse {
  message: string;
  token: string;
  userId: number;
  role: Rol;
}
