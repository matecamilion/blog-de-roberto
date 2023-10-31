"use client";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function Page() {
    const { user } = useContext(UserContext);

    return (
        
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Nombre</dt>
                        <dd className="text-gray-700 sm:col-span-2">{user.nombre}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Edad</dt>
                        <dd className="text-gray-700 sm:col-span-2">{user.edad}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Email</dt>
                        <dd className="text-gray-700 sm:col-span-2">{user.email}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4" >
                        <dt className="font-medium text-gray-900">Contraseña</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                        {user.password}
                        </dd>
                    </div>
                    <div>
                        <Link href="/auth/registrarse" className="flex justify-center rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700">Volver</Link>
                    </div>
                </dl>
            </div> 
    );
}