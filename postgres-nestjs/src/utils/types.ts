export type CreateUserParams = {
  email: string;
  password: string;
};
export type UpdateUserParams = {
  email: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstname: string;
  lastname: string;
  age: number;
  dob: string;
};

export type CreateUserPostParams = {
  title: string;
  description: string;
};
