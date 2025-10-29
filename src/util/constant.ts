export class Constants {
    static readonly JWT_SECRET = process.env.JWT_SECRET || 'hellosir';
    static readonly JWT_EXPIRES_IN = '24h';
    

}


export enum CollectionNames {
    USERS = 'users',
    CATEGORIES= 'categories',
    CATEGORY_FORMS= 'category_forms',
    
}; 