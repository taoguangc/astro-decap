import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import robotsTxt from 'astro-robots-txt'
import NetlifyCMS from 'astro-netlify-cms'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    alpinejs(),
    robotsTxt(),
    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        media_folder: 'src/content/posts',
        collections: [
          {
            name: 'posts',
            label: 'Blog Posts',
            folder: 'src/content/posts',
            create: true,
            delete: true,
            fields: [
              { name: 'title', widget: 'string', label: 'Post Title' },
              { name: 'description', widget: 'string', label: 'Post Description', required: false },
              { name: 'pubDate', widget: 'datetime', label: 'Publish Date' },
              { name: 'heroImage', widget: 'image', label: 'Hero Image' },
              { name: 'body', widget: 'markdown', label: 'Post Body' },
            ],
          },
        ],
      },
    }),
  ],
})
