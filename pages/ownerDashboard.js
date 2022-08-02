
import Head from "next/head"
import Image from "next/image"
import { useMoralisQuery, useMoralis } from "react-moralis"
// import networkMapping from "../constants/networkMapping.json"
import { useQuery } from "@apollo/client"
// import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import styles from "../styles/Home.module.css"
import { ConnectButton } from "web3uikit"
import Header from "../components/Header"
import OwnerWorkflow from "../components/OwnerWorkflow"

export default function OwnerDashboard() {
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
                <title>MediChain - Owner Dashboard</title>
                <meta name="description" content="MediChain - Owner Dashboard" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <div className="container">
                <div className="py-4 px-3 font-bold text-4xl ml-12">
                    Owner Dashboard
                    {isWeb3Enabled ? (<div className="badge badge-primary ml-4">Web3 is Enabled</div>):(<div class="badge badge-warning ml-4">Web3 Not Enabled</div>)}
                </div>
                <div className="mx-auto ml-12"><ConnectButton moralisAuth={false}/></div>
                <div className="flex flex-wrap">
                    {isWeb3Enabled ? (
                        <div>{/* 1. can view the details of all the patients registered in the system. (show the list of details of all the patients)
                        2. Possibly show the list of all the doctors registered in the system. (show the list of details of all the doctors)
                        3. Possibly show the list of all the hospitals registered in the system. (show the list of details of all the hospitals)
                          */}</div>
                    ) : (
                        <div>
                        
                        <OwnerWorkflow/>
                        </div>


                    )}
                </div>
            </div>
        </div>
    )
}
