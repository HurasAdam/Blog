import { ReactNode } from 'react'
enum ItemType {
    Link = 'link',
    Dropdown = 'dropdown',
}

export interface IbreadCrumb {
    name: string;
    link: string;
}

export interface ISoscialShareButtonsProps {
    url: string;
    title: string;
}

export type INavItemProps = {
    item: {
        name: string;
        type: ItemType | string;
        items?: string[];
    }
}

export interface IUserInfo {
    admin: boolean;
    avatar: string;
    email: string;
    name: string;
    token: string;
    verified: boolean;
    _id: string;
}


export interface IUserState {
    userInfo: IUserInfo | null
}

export interface IRootUserState {
    user: IUserState
}

export interface MainLayoutProps {
    children: ReactNode;
}
export interface IRegisterFormData {
    name: string;
    email: string;
    password: string;
}
export interface ILoginFormData {
    email: string;
    password: string;
}

export interface IToken {
    token: string;
}

export interface IUpdateProfileFormData {
    token: IToken;
    userData: IRegisterFormData;
}



export interface IUpdateUserProfileFormData {
    token: IToken;
    formData: {
        userId: string;
        name: string;
        email: string;
        password?: string
        admin: boolean;
        verified: boolean
    };
}

export interface IUpdateProfilePictureFormData {
    token: IToken,
    formData: FormData
}

export interface IProfileResponse {
    _id: string;
    avatar: string;
    name: string;
    email: string;
    verified: boolean;
    admin: boolean;
}
export interface User {
    _id: string;
    avatar: string;
    name: string;
    verified: boolean;
}

export interface Tag {
    _id: string;
    name: string;
}

export interface Category {
    _id: string;
    name: string;
}
export interface Post {
    _id: string;
    title: string;
    description: string;
    readingTime: string;
    user: User;
    photo?: string;
    tags: Tag[];
    categories: Category[];
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface PostsResponse {
    data: Post[];
    headers?: {
        "content-length"?: string;
        "content-type"?: string;
        "x-currentpage"?: string;
        "x-filter"?: string;
        "x-pagesize"?: string;
        "x-totalcount"?: string;
        "x-totalpagecount"?: string;
    };
}