//This is the Home Page(landing page) of the application.
import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Link from "next/link"

export default function Home() {
    return (
        <div>
            <Head>
                <title>MediChain - Homepage</title>
                <meta name="description" content="MediChain - Homepage" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <div className="overflow-x-hidden antialiased">
                {/* Header Here */}
                <Header />
                {/* <!-- BEGIN MAIN SECTION --> */}
                <div className="relative items-center justify-center w-full overflow-x-hidden lg:pt-40 lg:pb-24 xl:pt-24 xl:pb-64">
                    <div className="container flex flex-col items-center justify-between h-full max-w-6xl px-8 mx-auto -mt-32 lg:flex-row xl:px-0">
                        <div className="z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-1/2 lg:pt-20 xl:pt-40 lg:text-left">
                            <h1 className="relative mb-4 text-3xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-8">
                                Decentralized Medical Record Keeping System
                            </h1>
                            <p className="pr-0 mb-8 text-base text-gray-600 sm:text-lg xl:text-xl lg:pr-20">
                                An ethereum based decentralized application
                                where only patients can access there medical
                                data, providing full control over the data.
                            </p>
                            <button className="btn btn-primary md:btn-md btn-sm text-center">
                                <Link href="/patientDashboard">
                                    <a>Patient Login</a>
                                </Link>
                            </button>
                            <button className="btn btn-primary md:btn-base btn-sm md:hidden mt-4 md:mt-0">
                                <Link href="/doctorDashboard">
                                    <a>Doctor Login</a>
                                </Link>
                            </button>
                            <button className="btn btn-primary md:btn-base btn-sm md:hidden mt-4 md:mt-0">
                                <Link href="/hospitalDashboard">
                                    <a>Hospital Login</a>
                                </Link>
                            </button>
                            <button className="btn btn-primary md:btn-base btn-sm md:hidden mt-4 md:mt-0">
                                <Link href="/ownerDashboard">
                                    <a>Owner Login</a>
                                </Link>
                            </button>
                        </div>
                        <div className="relative z-50 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10">
                            <div className="container relative left-0 w-full max-w-4xl lg:absolute lg:w-screen">
                                <img
                                    src="/homepage-mockup-image.png"
                                    className="mt-24 w-auto h-auto rounded-lg lg:w-3/4 lg:h-3/4 lg:mt-32"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- HERO SECTION END --> */}

                {/* <!-- BEGIN FEATURES SECTION --> */}
                <div
                    id="features"
                    className="relative w-full px-8 py-10 border-t border-gray-200 md:py-16 lg:py-24 xl:py-40 xl:px-0"
                >
                    <div className="container flex flex-col items-center justify-between h-full max-w-6xl mx-auto">
                        <h2 className="my-5 text-base font-medium tracking-tight text-indigo-500 uppercase">
                            Features
                        </h2>
                        <h3 className="max-w-2xl px-5 mt-2 text-3xl font-black leading-tight text-center text-gray-900 sm:mt-0 sm:px-0 sm:text-6xl">
                            Built and Designed with patients ease and privacy in
                            Mind
                        </h3>
                        <div className="flex flex-col w-full mt-0 lg:flex-row sm:mt-10 lg:mt-20">
                            <div className="w-full max-w-md p-4 mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                                    {/* We have a SVG here */}
                                    <img
                                        src="/abstractBackground1.svg"
                                        alt=""
                                        className="absolute w-full h-full text-gray-100 fill-current"
                                    />
                                    {/* <!-- FEATURE Icon 1 SVG--> */}
                                    <img
                                        src="/featureIcon1.svg"
                                        alt=""
                                        className="relative w-20 h-20"
                                    />
                                    <h4 className="relative mt-6 text-lg font-bold">
                                        Ease and Control
                                    </h4>
                                    <p className="relative mt-2 md:text-base text-sm text-center text-gray-600">
                                        Ease and control of your medical
                                        records. You can access it whenever you
                                        want. Only you can access your data and
                                        no one can.
                                    </p>
                                    <a
                                        href="https://www.cloudflare.com/en-in/learning/ssl/how-does-public-key-encryption-work/"
                                        className="relative flex mt-2 text-sm font-medium text-indigo-500 underline"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            <div className="w-full max-w-md p-4 mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                                    {/* We have a SVG here */}
                                    <img
                                        src="/abstractBackground2.svg"
                                        alt=""
                                        className="absolute w-full h-full text-gray-100 fill-current"
                                    />
                                    {/* <!-- FEATURE Icon 2 SVG --> */}
                                    <img
                                        src="/featureIcon2.svg"
                                        alt=""
                                        className="relative w-20 h-20"
                                    />
                                    <h4 className="relative mt-6 text-lg font-bold">
                                        Immutability
                                    </h4>
                                    <p className="relative mt-2 md:text-base text-sm text-center text-gray-600">
                                        Being deployed on public blockchain,
                                        this application makes sure that the
                                        patient's data is permanent, indellible
                                        and unalterable.
                                    </p>
                                    <a
                                        href="https://www.solulab.com/what-is-immutable-ledger-in-blockchain-and-its-benefits"
                                        className="relative flex mt-2 text-sm font-medium text-indigo-500 underline"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>

                            <div className="w-full max-w-md p-4 mx-auto mb-16 lg:mb-0 lg:w-1/3">
                                <div className="relative flex flex-col items-center justify-center w-full h-full p-20 mr-5 rounded-lg">
                                    {/* We have a SVG here */}
                                    <img
                                        src="/abstractBackground3.svg"
                                        alt=""
                                        className="absolute w-full h-full text-gray-100 fill-current"
                                    />
                                    {/* <!-- FEATURE Icon 3 SVG --> */}
                                    <img
                                        src="featureIcon3.svg"
                                        alt=""
                                        className="relative w-20 h-20"
                                    />
                                    <h4 className="relative mt-6 text-lg font-bold">
                                        Enhanced Security
                                    </h4>
                                    <p className="relative mt-2 md:text-base text-sm text-center text-gray-600">
                                        Every node in the network has an
                                        encrypted copy of you data which only
                                        you can decrypt. This removes single
                                        point of failure making the data safe
                                        from ransomeware attacks.
                                    </p>
                                    <a
                                        href="https://www.techopedia.com/can-the-blockchain-be-hacked/2/33623"
                                        className="relative flex mt-2 text-sm font-medium text-indigo-500 underline"
                                    >
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- END FEATURES SECTION --> */}
            </div>
        </div>
    )
}
