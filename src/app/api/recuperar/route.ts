import  { PrismaClient } from "@prisma/client"
import { sign } from "jsonwebtoken";
import { send } from "@emailjs/browser";

const prisma = new PrismaClient();  

export async function POST(req: Request) {
    const datos = await req.json();

    const usuario = await prisma.usuario.findUnique({where: { email:  datos.email}});

    if(!usuario) {
        return new Response (JSON.stringify({msg: "Este usuario no existe!"}), {
            status: 400,
        })
    }

    const tokenUnicoParaRecuperacion =  sign(
        datos.email, 
        process.env.TOKEN_SECRET as string
    ); 

    const emailAEnviar = {
        asunto: "Recupera tu contraseña",
        from_name: "Blog de Roberto ",
        to_name: usuario.nombre,
        link: `http://localhost:3000/auth/recuperar/${tokenUnicoParaRecuperacion}`,
        user_email: datos.email
        }

    console.log(emailAEnviar)

   

return new Response(JSON.stringify(emailAEnviar))
}
