async function obtenerPublicaciones() {
    const respuesta = await fetch("http://localhost:3000/api/usuarios/publicaciones", {
      cache: "no-store",
    });
    const datos = await respuesta.json();
    return datos;
  }
  
  type Publicacion = {
    id: string;
    titulo: string;
    edad: number;
    email: string;
    password: string;
    activo: boolean;
  };
  
  export default async function Pagina() {
    const publicaciones = await obtenerPublicaciones();
  
    return (
      <section>
        <h2>Publicaciones</h2>
  
        <ul>
          {publicaciones.map((publicacion: Publicacion) => (
            <li key={publicacion.id}>
              {publicacion.titulo} - {publicacion.contenido}
            </li>
          ))}
        </ul>
      </section>
    );
  }