import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType= defineType({
    name:"sale",
    title: "Sales",
    type: "document",
    icon: TagIcon,
fields: [
    defineField({
        name: "title",
        title: "Sale Title",
        type: "string",
    }),
    defineField({
        name: "description",
        title: "Sale Description",
        type: "text",
    }),
    defineField({
        name: "discountAmount",
        title: "Discount Amount",
        type: "number",
        description: "Amount off in percentage",
    }),
    defineField({
        name: "couponCode",
        title: "Coupon Code",
        type: "string",
    }),
    defineField({
        name: "validForm",
        title: "Valid Form",
        type: "datetime",
    }),
    defineField({
        name: "validUntil",
        title: "Valid Until",
        type: "datetime",
    }),
    //isActive 
    defineField({
        name:"isActive",
        title: "Is Active",
        type: "boolean",
        description: "Toggle to activate or deactivate the sale",
        initialValue: true,

    })
],
preview:{
    select: {
        title :"title",
        discountAmount: "discountAmount",
        couponCode: "couponCode",
        isActive: "isActive",
    },
    prepare(selection){
        const {title,discountAmount,couponCode,isActive}= selection;
        const status=isActive ? "Active" : "Inactive";
        return{
            title,
            subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
        }
    }
}
})