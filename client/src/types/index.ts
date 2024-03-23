enum ItemType {
    Link = 'link',
    Dropdown = 'dropdown',
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