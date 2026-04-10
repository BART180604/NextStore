import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const storeType = defineType({
  name: "store",
  title: "Store / Vendor",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Store Name",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Store Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Store Description",
      type: "text",
    }),
    defineField({
      name: "vendor",
      title: "Vendor (Clerk User ID)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Store Rating",
      type: "number",
      readOnly: true,
    }),
  ],
});
