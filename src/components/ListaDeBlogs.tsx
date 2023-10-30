import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Image from 'next/image'
import Link from 'next/link'

export default function ListaDeBlogs() {
    const direccionDeMisBlogs = "src/blogs"
    const archivos = fs.readdirSync(path.join(direccionDeMisBlogs))

    const blogs = archivos.map((nombreDeArchivo) => {
        const contenidoDelArchivo = fs.readFileSync(path.join(direccionDeMisBlogs, nombreDeArchivo), "utf-8")

        const { data: frontMatter } = matter(contenidoDelArchivo)

        return {
            meta: frontMatter,
            slug: nombreDeArchivo.replace(".mdx", "")
        }
    })



    return (
        <ul>

            {
                blogs.map((blog, index) => (



                    <article className="flex bg-white transition hover:shadow-xl">
                        <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                            <time
                                dateTime="2022-10-10"
                                className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                            >
                                <span>2022</span>
                                <span className="w-px flex-1 bg-gray-900/10"></span>
                                <span>{blog.meta.date}</span>
                            </time>
                        </div>

                        <div className="hidden sm:block sm:basis-56">
                            <img
                                alt="Guitar"
                                src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                                className="aspect-square h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                            <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                                <a href="#">
                                    <h3 className="font-bold uppercase text-gray-900">
                                        {blog.meta.title}
                                    </h3>
                                </a>

                                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                                    {blog.meta.description}
                                </p>
                            </div>

                            <div className="sm:flex sm:items-end sm:justify-end">
                                <Link href={`/blogs/${blog.slug}`}
                                    className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                                >
                                    Read Blog
                                </Link>
                            </div>
                        </div>
                    </article>

                ))
            }
        </ul>
    )
}