import api from "./axios";

export type SignupRequest = {
  loginId: string;
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
};

export const signupApi = async (data: SignupRequest) => {
  const response = await api.post("/api/auth/signup", data);

  return response.data;
};
