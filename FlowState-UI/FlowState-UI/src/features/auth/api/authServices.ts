import api from "../../../app/api";

type RegisterPayload = {
    name: string;
    email: string;
    password: string;
};

type RegisterResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};

export const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/account/register', payload);
    return response.data;
};  