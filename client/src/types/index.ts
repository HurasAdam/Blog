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