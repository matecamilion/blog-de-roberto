"use client";
import { FormEvent, useRef } from "react"
import { verify } from "jsonwebtoken";
import { useRouter } from 'next/navigation'
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

export default function FormularioDeRegistro() {
    const nombreRef = useRef(null)
    const edadRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const recordarmeRef = useRef(null)

    const { user, setUser } = useContext(UserContext)
    const router = useRouter()

    async function mandarDatosDeRegistro(evento: FormEvent) {
        evento.preventDefault();

        const datosAEnviar = {
            //@ts-ignore
            nombre: nombreRef.current?.value,
            //@ts-ignore
            edad: Number(edadRef.current?.value),
            //@ts-ignore
            email: emailRef.current?.value,
            //@ts-ignore
            password: passwordRef.current?.value

        }

        console.log(datosAEnviar)
        const respuesta = await fetch(
            "http://localhost:3000/api/usuarios/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "aplication/json"
                },
                body: JSON.stringify(datosAEnviar),
            });

        if (respuesta.status != 201) {
            const error = await respuesta.json();
            alert(error.msg);
        }

        if(respuesta.status == 201) {
            router.push("/auth/iniciar-sesion")
        }


        const { token } = await respuesta.json();

        setUser({ ...datosAEnviar, token })

        //@ts-ignore
        if (recordarmeRef.current?.value) {
            localStorage.setItem("usuario", JSON.stringify(datosAEnviar));
        }

        console.log(user);

        // const usuarioDecodificado = verify(
        //     token as string,
        //     process.env.NEXT_PUBLIC_TOKEN_SECRET as string 
        //     ); 
        // console.log(usuarioDecodificado)

    }


    return (

        <>
            <form onSubmit={mandarDatosDeRegistro} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">

                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-center text-2xl font-bold text-teal-600 sm:text-3xl">
                            Registrarse
                        </h1>

                        <br />
                        <br />

                        <p className="text-center text-lg font-medium">Crea tu cuenta</p>

                        <div>
                            <label htmlFor="text" className="sr-only">Nombre completo</label>

                            <div className="relative">
                                <br />
                                <input
                                    ref={nombreRef}
                                    type="text"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Ingrese su nombre completo"
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
                            <label htmlFor="number" className="sr-only">Edad</label>

                            <div className="relative">
                                <br />
                                <input
                                    ref={edadRef}
                                    type="number"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Ingrese su edad"
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

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    ref={emailRef}
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Ingrese su email"
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

                        <div>
                            <label htmlFor="contraseña" className="sr-only">Contraseña</label>

                            <div className="relative">
                                <input
                                    ref={passwordRef}
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Ingrese su contraseña"
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
                        <div className="flex justify-center w-full      py-3 text-m font-medium"> 
                        <label htmlFor="">Recordarme</label>
                        <input ref={recordarmeRef} type="checkbox"  placeholder="Recordarme"/>

                        </div>
                         
                        

                        <input
                            type="submit"
                            value="Registrarse"
                            className="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
                
                        />

                        <p className="text-center text-sm text-gray-500">
                            Ya tenes cuenta?
                            <Link className="underline" href="/auth/iniciar-sesion">Inicia sesion</Link>
                        </p>

                    </div>
                </div>
                
            </form>
            <Link href="/auth/iniciar-sesion">Ir al perfil</Link>
        </>

    )
}
