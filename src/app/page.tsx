import ListaDeBlogs from '@/components/ListaDeBlogs'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black items-center justify-between p-24">

      <ListaDeBlogs />

    </main>
  )
}
