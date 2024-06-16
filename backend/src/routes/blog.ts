import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { blogpostSchema, blogupdateSchema } from "@rickcodes2026/thought-stream-common";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL: string,
        JWT_SECRET: string
    }, 
    Variables: {
        userId: string
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const word = authHeader.split(" ");
    if (!authHeader || word[0] != 'Bearer') {
        c.status(400);
            return c.json({
            message : "Unauthorized"
        })
    }

    const token = word[1];
    try {
        const decode = await verify (token, c.env.JWT_SECRET);
        if (decode) {
            c.set("userId", String(decode.id));
            await next()
        } else {
            c.status(400);
            return c.json({
                message: "You are not logged into ThoughtStream"
            })
        }
    } catch (e) {
        c.status(400)
        return c.json({
            message: "You are not logged into ThoughtStream"
        })
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const correctBlogPost = blogpostSchema.safeParse(body);
    if (!correctBlogPost.success) {
        c.status(400)
        return c.json({
            message: "Whenever you are posting a blog it must have both the title and content" 
        })
    }

    const userId = c.get("userId")

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(userId)
            }
        })
    
        return c.json({
            message : blog.id
        })
    } catch (e) {
        c.status(500);
        return c.json({
            message : "Error while posting blog"
        })
    }
  })
  
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const correctBlogUpdate = blogupdateSchema.safeParse(body);
    if (!correctBlogUpdate.success) {
        c.status(400)
        return c.json({
            message: "While updating you must enter the id of the blog whereas the title and content is optional"
        })
    }

    const userId = c.get("userId")

    const findBlog = await prisma.post.findUnique({
        where: {
            id: body.id,
            authorId: Number(userId)
        }
    })

    if (!findBlog) {
        c.status(403);
        return c.json({
            message: "No such blog exists for this user"
        })
    }

    const blog = await prisma.post.update({
        where: {
            id: body.id,
            authorId: Number(userId)
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        message : blog.id,
        updatedBlog: blog
    })
})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({});

    return c.json({
        message : blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id")
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            }
        })
        if (!blog) {
            c.status(403);
            return c.json({
                message: "No such blog exist"
            })
        }
        c.status(200)
        return c.json({
            blog
        })
    } catch (e) {
        c.status(400);
        return c.json({
            message: "Error while fetching the post"
        })
    }
})

