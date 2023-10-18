import { defineCollection, z } from 'astro:content'

const seoSchema = z
  .object({
    page_description: z.string().nullable(),
    canonical_url: z.string().nullable(),
    featured_image: z.string().nullable(),
    featured_image_alt: z.string().nullable(),
    no_index: z.boolean(),
  })
  .optional()

const pageSchema = z.object({
  _schema: z.any().optional(),
  title: z.string(),
  description: z.undefined(),
  blocks: z.array(z.any()),
  page_size: z.undefined(),
  seo: seoSchema,
})

const paginatedCollectionSchema = z.object({
  _schema: z.literal('paginated_collection'),
  title: z.string(),
  description: z.string().optional(),
  page_size: z.number().positive(),
  blocks: z.undefined(),
  seo: seoSchema,
})

const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      heroImage: image(),
      tags: z.array(z.string()).optional(),
    }),
})

const pages = defineCollection({
  schema: z.union([paginatedCollectionSchema, pageSchema]),
})

export const collections = { pages, posts }
