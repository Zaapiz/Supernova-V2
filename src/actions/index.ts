import { defineAction } from 'astro:actions';

export const server = {
  logout: defineAction({

    handler: async (input, context) => {
      context.session?.destroy()
      return 'done'
    }
  })
}