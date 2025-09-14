import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
export const productType = defineType({
  // Define the schema for the product type
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation : (Rule)=> Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true, // Enables image cropping
      },
    }),
    defineField({
      name: "price",
      title: "Product Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Product Description",
      type: "blockContent", // Assuming you have a blockContent schema defined
    }),
    defineField({
      name: "categories",
      title: "Product Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }], // Assuming you have a category schema defined
    }),
    defineField({
      name: "stock",
      title: "Product Stock",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  //Preview configuration for the product type
  preview: {
    // Configure how the product type will be displayed in the Sanity Studio
    select: {
      title: "name",
      media: "image",
      price: "price",
    },
    prepare(selection) {
      // Prepare the data for the preview
      return {
        title: selection.title,
        media: selection.media,
        subtitle: `$${selection.price}`, // Displaying price in the subtitle
      };
    },
  },
});