import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify, decode } from "hono/jwt";


export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const userExists = await prisma.user.findUnique({
            where : {
                email : body.email,
            }
        })
        if (userExists) {
            c.status(400);
            return c.json({
                message : "This username already exists"
            })
        } else {
            const user = await prisma.user.create({
                data: {
                    email: body.email,
                    password: body.password,
                    name: body.name
                }
            })
    
            const token = await sign({
                id: user.id
            }, c.env.JWT_SECRET);
    
            c.status(200)
            return c.json({
                message: "User signup successfull",
                token: token
            });
        }

    } catch (e) {
        c.status(400);
        return c.json({
            message: "Error while signing up"
        })
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    console.log(body)
    try {
      const user = await prisma.user.findUnique({
        where : {
          email: body.email,
          password: body.password
        }
      });
      if (!user) {
        c.status(400);
        return c.json({
          message : "User doesn't exist",
        })
      }
  
      const token = await sign({
        id: user.id
      }, c.env.JWT_SECRET);
  
      c.status(200);
      return c.json({
        message : "Signed in successfully",
        token : token
      })
    } catch (e) {
      c.status(400);
      return c.json({
        message : "Error while signing in"
      })
    }
  })