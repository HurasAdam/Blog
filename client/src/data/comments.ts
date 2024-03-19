type IUser = {
    _id: string;
    name: string;
}

type ICommentResponse = {
    _id: string;
    user: IUser;
    post: string;
    desc: string;
    parent: string | null;
    replyOnUser: string | null;
    createdAt: string;
}


export const getCommentsData = async (): Promise<ICommentResponse[]> => {
    return [
        {
            _id: "10",
            user: {
                _id: "a",
                name: "Anrew Rezaii",
            },
            desc: "First testing comment here",
            post: "1",
            parent: null,
            replyOnUser: null,
            createdAt: "2022-12-31T17:22:05.092+0000",
        },
        {
            _id: "11",
            user: {
                _id: "b",
                name: "Paul M. Williams",
            },
            desc: "a reply for Mohammad",
            post: "1",
            parent: "10",
            replyOnUser: "a",
            createdAt: "2022-12-31T17:22:05.092+0000",
        },
        {
            _id: "12",
            user: {
                _id: "b",
                name: "Paul M. Williams",
            },
            desc: "I like it a lot !",
            post: "1",
            parent: null,
            replyOnUser: null,
            createdAt: "2022-12-31T17:22:05.092+0000",
        },
        {
            _id: "13",
            user: {
                _id: "c",
                name: "Jessica C. Stephens",
            },
            desc: "Cool !",
            post: "1",
            parent: null,
            replyOnUser: null,
            createdAt: "2022-12-31T17:22:05.092+0000",
        },
    ];
};