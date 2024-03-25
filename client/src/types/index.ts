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