//This is the Dashboard of the hospital. This logs in the hospital and hospital can view their information.
//This is just a add-on / redundant page. Just entity was coming up so I made this new page.

import Head from "next/head"
import Image from "next/image"
import { useMoralisQuery, useMoralis } from "react-moralis"
// import networkMapping from "../constants/networkMapping.json"
import { useQuery } from "@apollo/client"
// import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import styles from "../styles/Home.module.css"
import { ConnectButton } from "web3uikit"
import Header from "../components/Header"
import HospitalWorkflow from "../components/HospitalWorkflow"

export default function HospitalDashboard() {
    const { isWeb3Enabled, chainId: chainHexId } = useMoralis()
    const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"
    // const marketplaceAddress = networkMapping[chainId].NftMarketplace[0]

    // const {
    //     loading: fetchingListedNfts,
    //     data: listedNfts,
    //     error,
    // } = useQuery(GET_ACTIVE_ITEMS)

    // if (listedNfts) {
    //     console.log(listedNfts)
    // } else {
    //     console.log("listed NFT is empty")
    // }

    return (
        <div className="container mx-auto">
            <Head>
                <title>MediChain - Hospital Dashboard</title>
                <meta
                    name="description"
                    content="MediChain - Hospital Dashboard"
                />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <div className="container">
                <div className="py-4 px-3 font-bold text-4xl ml-12">
                    Hospital Dashboard
                    {isWeb3Enabled ? (
                        <div className="badge badge-primary ml-4">
                            Web3 is Enabled
                        </div>
                    ) : (
                        <div className="badge badge-warning ml-4">
                            Web3 Not Enabled
                        </div>
                    )}
                </div>
                <div className="mx-auto ml-12">
                    <ConnectButton moralisAuth={false} />
                </div>
                <div className="flex flex-wrap">
                    {isWeb3Enabled ? (
                        <div>
                            {/* 1. if patient is registered then show the medical record of the patient 
                        
                        2. Otherwise give a registration form to the patient to register in form of a modal.
                          */}
                        </div>
                    ) : (
                        <div>
                            <HospitalWorkflow />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
