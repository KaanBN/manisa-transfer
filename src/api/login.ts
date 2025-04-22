import {User} from "@/models/userModel.ts";

type LoginParams = {
    username: string;
    password: string;
};

export const login = async ({ username, password }: LoginParams): Promise<User> => {
    if (username === 'kaan' && password === '123456') {
        return {
            id: 1,
            username: 'kaan',
            profileImage: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
        };
    }

    throw new Error('Kullanıcı adı veya şifre hatalı');
};
