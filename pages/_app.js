import "../styles/globals.css"
import {NotificationProvider} from "@web3uikit/core"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import Footer from "../components/Footer"

import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

//The Graph
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.subgraph_url, //change this uri here and make a graph uri
})

// configuring rainbow kit
const { chains, provider } = configureChains(
    [goerli],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
    appName: "MediChain: Decentralized Telemedicine and Medical Records",
    chains,
})

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                    <ApolloProvider client={client}>
                        <NotificationProvider>
                            <Component {...pageProps} />
                            <Footer />
                        </NotificationProvider>
                    </ApolloProvider>
                </RainbowKitProvider>
            </WagmiConfig>
        </div>
    )
}

export default MyApp
