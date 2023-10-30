"use client"
import { FormEvent, useRef } from "react";
import { useContext } from "react";
import jwt from "jsonwebtoken"
import { decode } from "jsonwebtoken";
import { UserContext } from "@/context/UserContext";
import { useRouter } from 'next/navigation'
import Link from "next/link";



export default function FormularioDeInicioSesion() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const { user, setUser } = useContext(UserContext) 
    const router = useRouter()

    async function mandarDatosDeInicioSesion(evento: FormEvent) {
        evento.preventDefault()

        const datosAEnviar = {

            //@ts-ignore
            email: emailRef.current?.value,
            //@ts-ignore
            password: passwordRef.current?.value
        }

        const respuesta = await fetch(
            "http://localhost:3000/api/usuarios/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "aplication/json"
                },
                body: JSON.stringify(datosAEnviar),
            });

            if(respuesta.status != 200){
                const error = await respuesta.json();
                alert(error.msg)
            }

            if(respuesta.status == 200){
                
                const { token } = await respuesta.text();


                const decoded = jwt.decode(token)
                setUser({ ...datosAEnviar, decoded })
             

                alert(`Bienvenido!`),
                router.push("/perfil")
            }      
        }

  return(
    <form onSubmit={mandarDatosDeInicioSesion}>
        <input ref={emailRef} type="email" placeholder="Email"/>
        <input ref={passwordRef} type="password" placeholder="Contraseña"/>
        <input type="submit" value="Iniciar sesion" />
    </form>
  )
}