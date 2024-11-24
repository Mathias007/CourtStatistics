export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
}

export interface UserInput {
    username: string;
    email: string;
    password: string;
}
