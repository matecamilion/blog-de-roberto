"use client";
import { send } from "@emailjs/browser";
import { FormEvent, useRef, useState } from "react"

export default function Page() {

    const emailRef = useRef(null)
    const [mailEnviado, setMailEnviado] = useState(false)
    
    async function recuperarContrasenia(evento: FormEvent) {
        evento.preventDefault();    
        const respuesta = await fetch("http://localhost:3000/api/recuperar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //@ts-ignore
            body: JSON.stringify({email: emailRef.current?.value}),
        });

        if (respuesta.status !== 200) {
            alert("El email no existe");
            return;
        }

        const email = await respuesta.json()

        send(
            "service_tl14t6l", 
            "template_iqy9ygg", 
            email,
            "4l0Syo8jFWPwOuATr"
        );

        setMailEnviado(true);
    } 
    return (
        <section>
            {
                mailEnviado ? (
                    <h2>Mail enviado exitosamente! Revisa tu correo</h2>
                ) :  (
                <form onSubmit={recuperarContrasenia}>
                <input type="email" ref={emailRef} placeholder="Email para recuperacion"/>
                <input type="submit" value="Enviar email de recuperacion " />
                </form>
                ) 
            }
            
        </section>
    )
}
