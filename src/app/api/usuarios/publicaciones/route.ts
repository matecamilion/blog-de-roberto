import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const publicacion = await req.json();

    const usuarioEnDB = await prisma.usuario.findUnique({
      where: {
        email: usuario.email,
      },
    });


  return new Response(JSON.stringify(publicacion), { status: 200 });
}