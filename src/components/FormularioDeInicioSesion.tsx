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

        if (respuesta.status != 200) {
            const error = await respuesta.json();
            alert(error.msg)
        }   

        if (respuesta.status == 200) {

            //@ts-ignore
            const { token } = await respuesta.text();


            const decoded = jwt.decode(token)
            setUser({ ...datosAEnviar, decoded })


            alert("Bienvenido!"),
                router.push("/perfil")
        }
    }

    return (
        <form onSubmit={mandarDatosDeInicioSesion}  className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">

            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-teal-600 sm:text-3xl">
                        Iniciar sesión
                    </h1>

                    <br />
                    <br />
                    
                        <p className="text-center text-lg font-medium">Inicia sesion en tu cuenta</p>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <br />
                                <input
                                    ref={emailRef}
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Ingresa el email"
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>

                            <div className="relative">
                                <br />
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Ingrese la contraseña"
                                />

                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <br />
                        <input
                            type="submit"
                            value="Iniciar sesion"
                            className="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
                        />



                        <p className="text-center text-sm text-gray-500">
                            No tenes cuenta?
                            <Link className="underline" href="/auth/registrarse">   Registrate</Link>
                        </p>
                    
                </div>
            </div>
        </form>



    )
}