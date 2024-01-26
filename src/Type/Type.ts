export type userLogin = {
    id: number;
    username : string;
    name: string;
    token : string;
    expireTime: number;

}
export type user = {
    id: number;
    name: string;
    username: string;
    password : string;
}
export type task = {
    id: number;
    userId: string;
    title: string;
    category: string;
    status: number;
    createAt: string;
    completeAt: string;
}
export type metadata = {
    totalPages : number;
    totalElements : number;
    elements: number;
}