export interface Board {
    _id: string;
    writer?: string | null;
    title: string;
    contents: string;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
    youtubeUrl?: string | null;
    likeCount: number;
    dislikeCount: number;
    images?: string[] | null;
    boardAddress?: BoardAddress | null;
}

export interface BoardAddress {
    _id: string;
    zipcode?: string | null;
    address?: string | null;
    addressDetail?: string | null;
    createdAt: any;
    updatedAt: any;
    deletedAt?: any | null;
}

export interface IBoardsWriteProps {
    isEdit: boolean;
}