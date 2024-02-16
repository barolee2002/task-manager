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
export type product = {
    id: number;
    title: string,
    description : string;
    image : string;
    category : string,
    price : number,
    rating : {
        rate: number,
        count : number
    }
}
export type cart = {
    id : number
    product : product;
    quantity : number;
    createAt : string;
}
export type metadata = {
    totalPages : number;
    totalElements : number;
    elements: number;
}