import { defineAction } from 'astro:actions';

export const account = {
  logout: defineAction({
    handler: async (input, context) => {
      context.session?.destroy()
      return 'done'
    }
  }),
  signup: defineAction({
    handler: async (input, context) => {
      console.log(input)
      return {status: "successful", message: null}
    }
  })
}