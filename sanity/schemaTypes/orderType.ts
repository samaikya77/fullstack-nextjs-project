import { BasketIcon } from "@sanity/icons";
import { defineArrayMember } from "sanity";
import { defineField, defineType } from "sanity";

export const orderType= defineType({
    name: "order",
    title: "Order",
    type: "document",
    icon: BasketIcon,
    fields: [
        defineField({
            name: "orderNumber",
            title: "Order Number",
            type: "string",
            validation : (Rule)=>Rule.required(),
        }),
        defineField({
            name: "stripeCheckoutSessionId",
            title: "Stripe Checkout Session ID",
            type: "string",
        }),
        defineField({
             name: "stripeCustomerId",
             title: "Stripe Customer ID",
             type: "string",
             validation : (Rule)=> Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Customer Email",
            type: "string",
            validation : (Rule)=> Rule.required(),
        }),
        defineField({
            name: "clerkUserId",
            title: "Clerk User ID",
            type: "string",
            validation : (Rule)=> Rule.required(),
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
            validation : (Rule)=> Rule.required(),
        }),
        defineField({
            name: "stripePaymentIntentId",
            title: "Stripe payment Intent ID",
            type: "string",
            validation : (Rule)=> Rule.required(),
        }),
        defineField({
            name: "products",
            title: "Products",
            type: "array",
            of: [
              defineArrayMember({
                type: "object",
                fields:[
                    defineField({
                        name: "product",
                        title: "Product Bought",
                        type: "reference",
                        to: [{type: "product"}],
                    }),
                    defineField({
                        name: "quantitypurchased",
                        title: "Quantity Purchased",
                        type: "number",
                        
                    }),
                   
                ],
                preview: {
                    select: {
                        product : "product.name",
                        quantity: "quantity",
                        image: "product.image",
                        price: "product.price",
                        currency: "product.currency",
                    },
                    prepare(selection){
                        const {product,quantity, image, price, currency} = selection;
                        return {
                            title: `${product} - ${ quantity} pcs`,
                            media: image,
                            subtitle: `${currency} ${price}`,
                        };
                    },

                }
              }),   
            ],
        }),
        defineField({
            name: "totalPrice",
            title: "Total Price",
            type: "number",
            validation : (Rule)=> Rule.required().min(0),
        }),
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            validation : (Rule)=> Rule.required(),
        }),
        defineField({
            name: "amountDiscount",
            title: "Amount Discount",
            type: "number",
            validation : (Rule)=> Rule.min(0),
        }),
        defineField({
            name: "status",
            title: "Order Status",
            type: "string",
            options:{
                list: [
                    {title: "Pending", value:"pending"},
                    {title: "Paid", value:"paid"},
                    {title: "Shipped", value:"shipped"},
                    {title: "Delivered", value:"delivered"},
                    {title: "Cancelled", value:"cancelled"},

                ],
            },
        }),
        defineField({
            name: "orderDate",
            title: "Order Date",
            type: "datetime",
            validation: (Rule)=> Rule.required(),
        })
    ],
    preview: {
        select:{
            name: "customerName",
            amount: "totalPrice",
            currency: "currency",
            orderId:"orderNumber",
            email: "email",
        },
        prepare(selection){
            const orderIdSnippet = `${selection.orderId.slice(0,5)}...${selection.orderId.slice(-5)}`;
            return{
                title: `${selection.name} (${orderIdSnippet})`,
                subtitle: `${selection.amount} ${selection.currency}, Email: ${selection.email}`,
                media: BasketIcon,

            }
        }
    }
})