import { useRouter } from "next/router"

export default function Error() {
    const router = useRouter()
    return (
        <div className="container mx-auto overflow-x-hidden h-screen">
            <Head>
                <title>MediChain - Error</title>
                <meta name="description" content="MediChain - Error" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <div>
                <div className="py-4 px-3 font-bold text-4xl ml-12">
                    <div>It's not you, it's us.</div>
                    <span>Error: {router.query.message}</span>
                </div>
            </div>
        </div>
    )
}
