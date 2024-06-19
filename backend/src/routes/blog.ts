import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { blogpostSchema, blogupdateSchema } from "@rickcodes2026/thought-stream-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }, 
    Variables: {
        userId: string
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== 'Bearer' || !token) {
        c.status(400);
        return c.json({ message: "Unauthorized" });
    }

    try {
        const decode = await verify(token, c.env.JWT_SECRET);
        if (decode) {
            c.set("userId", String(decode.id));
            await next();
        } else {
            c.status(400);
            return c.json({ message: "You are not logged into ThoughtStream" });
        }
    } catch (e) {
        c.status(400);
        return c.json({ message: "You are not logged into ThoughtStream" });
    }
});

function formatDate(date: Date): string {
    // Convert date to full date format: "June 19, 2024"
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return date.toLocaleDateString("en-US", options);
}

blogRouter.post('/publish', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const correctBlogPost = blogpostSchema.safeParse(body);

    if (!correctBlogPost.success) {
        c.status(400);
        return c.json({ message: "Whenever you are posting a blog it must have both the title and content" });
    }

    const userId = c.get("userId");

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(userId),
                createdAt: new Date() // Ensure createdAt is set
            }
        });

        return c.json({ message: blog.id });
    } catch (e) {
        c.status(500);
        return c.json({ message: "Error while posting blog" });
    }
});

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const correctBlogUpdate = blogupdateSchema.safeParse(body);

    if (!correctBlogUpdate.success) {
        c.status(400);
        return c.json({ message: "While updating you must enter the id of the blog whereas the title and content is optional" });
    }

    const userId = c.get("userId");

    const findBlog = await prisma.post.findUnique({
        where: {
            id: body.id,
            authorId: Number(userId)
        }
    });

    if (!findBlog) {
        c.status(403);
        return c.json({ message: "No such blog exists for this user" });
    }

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id,
                authorId: Number(userId)
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({
            message: blog.id,
            updatedBlog: blog
        });
    } catch (e) {
        c.status(500);
        return c.json({ message: "Error while updating blog" });
    }
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        // Format createdAt field before sending in response
        const formattedBlogs = blogs.map(blog => ({
            ...blog,
            createdAt: formatDate(blog.createdAt)
        }));

        return c.json({ message: formattedBlogs });
    } catch (e) {
        c.status(500);
        return c.json({ message: "Error while fetching blogs" });
    }
});

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!blog) {
            c.status(403);
            return c.json({ message: "No such blog exists" });
        }

        // Format createdAt field before sending in response
        const formattedBlog = {
            ...blog,
            createdAt: formatDate(blog.createdAt)
        };

        return c.json({ message: formattedBlog });
    } catch (e) {
        c.status(400);
        return c.json({ message: "Error while fetching the post" });
    }
});

export default blogRouter;
