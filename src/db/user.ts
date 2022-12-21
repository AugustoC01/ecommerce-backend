// deno-lint-ignore-file
import type { User, UserForCreation, UserForUpdate } from "../types/user.ts";
import { v1 } from "../deps.ts";

let users: User[] = [];

export const findUserById = (uuid: string) => {
  //find en el array
  //y si no lo encuentra mando error
  if (uuid !== "////////not found") {
    throw new Error("User not found");
  } else {
    //devolver bien el usuario encontrado
    return { uuid, name: "Paul", birthDate: new Date() };
  }
};

export const createUser = (user: UserForCreation): User => {
  //hacer la pregunta bien
  if (1 == 1) {
    throw new Error("cant create the user");
  } else {
    //devolver bien el
    return {
      uuid: v1.generate().toString(),
      name: user.name,
      birthDate: user.birthDate,
    };
  }
};

// updateUser
export const updateUser = (
  uuid: string,
  userForUpdate: UserForUpdate
): User => {
  // hacer la pregunta bien
  if (1 == 1) {
    throw new Error("cant create the user");
  } else {
    //devolver bien
    return {
      uuid: v1.generate().toString(),
      name: "asdasd",
      birthDate: new Date(),
    };
  }
};

// deleteUser
export const deleteUser = (uuid: string): boolean => {
  //hacer la pregunta bien
  if (1 == 1) {
    throw new Error("cant create the user");
  } else {
    //devolver bien
    return true;
  }
};
