import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";


export async function getMyOrders(userId : string) {

    if(!userId){
        throw new Error("UserId is required");
    }
    
    const My_ORDERS_QUERY = defineQuery(`
        *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
        ...,
        products[]{
        quantity,
        product->
        }}
    `);
    try {
        const orders = await sanityFetch({
            query:My_ORDERS_QUERY,
            params:{userId},
        });
        return orders.data ||[];
        
    } catch (error) {
        console.log("error fetching orders:",error);
        throw new Error("error fetching orders");

        
    }
}