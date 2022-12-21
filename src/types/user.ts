export interface User {
  uuid: string;
  name: string;
  birthDate: Date;
}

export interface UserForUpdate {
  name?: string;
  birthDate?: Date;
}

export interface UserForCreation {
  name: string;
  birthDate: Date;
}
