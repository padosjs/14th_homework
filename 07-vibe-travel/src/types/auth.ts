export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  loginUser: {
    accessToken: string;
  };
}

export interface SignupResponse {
  createUser: {
    _id: string;
  };
}

export interface SignupInput {
  email: string;
  name: string;
  password: string;
}
