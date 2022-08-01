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
                <meta name="description" content="MediChain - Hospital Dashboard" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <h1 className="py-4 px-3 font-bold text-4xl mx-auto">Hospital Dashboard</h1>
            <ConnectButton moralisAuth={false}/> 
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    <div>Web3 is Enabled</div>
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
