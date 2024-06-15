import { Hono } from "hono";
import { Prisma } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

blogRouter.post('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
  })
  
blogRouter.put('/api/v1/blog', (c) => {
    return c.text('Hello Hono!')
})
blogRouter.get('/api/v1/blog/:id', (c) => {
    const id = c.req.param('id');
    console.log(id);
    return c.text('Hello Hono!')
})