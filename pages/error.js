import { useRouter } from "next/router"
import Head from "next/head"

export default function Error() {
    const router = useRouter()
    return (
        <div className="container mx-auto overflow-x-hidden h-screen">
            <Head>
                <title>MediChain - Error</title>
                <meta name="description" content="MediChain - Error" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <div className="flex justify-center items-center">
                <div className="py-4 px-3 font-bold w-3/4 mt-20 bg-green-400 border rounded-md">
                    <div className="bg-yellow-400 border rounded-md w-full text-semibold text-center">It&apos;s not you, it&apos;s us.</div>
                    <span className="text-sm">Error: {router.query.message}</span>
                </div>
            </div>
        </div>
    )
}
