
import Link from "next/link"

export default function Header() {
    return (
        <header className="relative z-0 w-full h-24 shadow-sm">
            <div className="container flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0">
                <Link href="/">
                    <a className="relative flex items-center inline-block h-5 h-full font-black leading-none">
                        {/* We have a SVG here */}
                        <img src="/logo.svg" alt="Logo of MediChain" />
                        <span className="ml-3 text-xl text-gray-800">
                            MediChain
                            <span className="text-pink-500">.</span>
                        </span>
                    </a>
                </Link>

                <nav
                    id="nav"
                    className="absolute top-0 left-0 z-50 flex flex-col items-center justify-between hidden w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative"
                >
                    <Link href="/#">
                        <a className="ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600">
                            Home
                        </a>
                    </Link>
                    <Link href="/#features">
                        <a className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600">
                            Features
                        </a>
                    </Link>
                    <Link href="/hospitalDashboard">
                        <a className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600">
                            Hospital
                        </a>
                    </Link>
                    <Link href="/doctorDashboard">
                        <a className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600">
                            Doctor
                        </a>
                    </Link>
                    <div className="flex flex-col block w-full font-medium border-t border-gray-200 md:hidden">
                        <Link href="/ownerDashboard">
                            <a className="w-full py-2 font-bold text-center text-pink-500">
                                Owner
                            </a>
                        </Link>
                        <Link href="/patientDashboard">
                            <a className="relative inline-block w-full px-5 py-3 text-sm leading-none text-center text-white bg-indigo-700 fold-bold">
                                Patient
                            </a>
                        </Link>
                    </div>
                </nav>

                <div className=" absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between">
                    <Link href="/ownerDashboard">
                        <a className="relative z-40 px-3 py-2 mr-0 text-sm font-bold text-pink-500 md:px-5 lg:text-white sm:mr-3 md:mt-0">
                            Owner
                        </a>
                    </Link>
                    <Link href="/patientDashboard">
                        <a className="relative z-40 inline-block w-auto h-full px-5 py-3 text-sm font-bold leading-none text-white transition-all transition duration-100 duration-300 bg-indigo-700 rounded-lg shadow-md fold-bold lg:bg-white lg:text-indigo-700 sm:w-full lg:shadow-none hover:shadow-xl">
                            Patient
                        </a>
                    </Link>
                    {/* We have an SVG Here */}
                    <img
                        src="/overlappedSquare.svg"
                        className="absolute top-0 left-0 hidden w-screen max-w-3xl -mt-64 -ml-12 lg:block"
                        alt="overlapped square svg"
                    />
                </div>
            </div>
        </header>
    )
}
