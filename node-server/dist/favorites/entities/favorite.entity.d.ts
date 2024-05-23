import { Favorite } from "@prisma/client";
export declare class FavoriteEntity implements Favorite {
    id: number;
    productId: string;
    handle: string;
    name: string;
    img_url: string;
    createdAt: Date;
    updatedAt: Date;
    userEmail: string;
}
