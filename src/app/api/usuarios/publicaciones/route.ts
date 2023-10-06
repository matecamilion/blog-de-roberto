import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const publicacion = await req.json();

  const publicacionEnDB = await prisma.publicacion.findMany({
    where: {
      id: publicacion.id,
      titulo: publicacion.titulo,
      contenido: publicacion.contenido,
      autorId: publicacion.autorId
    },
  });

  if (!publicacionEnDB) {
    return new Response("La publicación ya existe.", { status: 400 }); 
  }

  return new Response(JSON.stringify(publicacion), { status: 200 });
} 