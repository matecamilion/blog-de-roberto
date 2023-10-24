import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
    const archivos  = fs.readdirSync(path.join("src/blogs"))

    const rutas = archivos.map((nombreDeArchivo) => ({
        slug: nombreDeArchivo.replace(".mdx", ""),
             
    })) 

    return rutas;
}

function obtenerBlog({slug}: { slug : string}) {
    const archivoDeBlog = fs.readFileSync(path.join("src/blogs/"+ slug + ".mdx"), "utf-8")

    const {data: frontMatter, content} = matter(archivoDeBlog);

    return {
        metadatos: frontMatter,
        slug,
        content,
    }
}

export default function Page({ params }: { params: { slug: string}  }) {
    const blog = obtenerBlog(params);

    return (
        <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
            <h1>{blog.metadatos.title}</h1>
            {/*@ts-ignore*/}
            <MDXRemote source={blog.content}></MDXRemote>
        </article>
    )
}

