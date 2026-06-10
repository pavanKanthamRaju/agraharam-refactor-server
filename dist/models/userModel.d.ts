import { User, CreateUserPayload } from '../types/index.js';
declare const getAllUsers: () => Promise<User[]>;
declare const createUser: (payload: CreateUserPayload) => Promise<User>;
declare const findUser: (identifier: string) => Promise<User | undefined>;
export { getAllUsers, createUser, findUser };
//# sourceMappingURL=userModel.d.ts.map