//Here we make a call to the URI and fetch data and display each data as a card.

import useSWR from "swr"
import truncatStr from "../utils/truncateString"
import { Loading } from "web3uikit"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ListItem({ metadataURI }) {
    //Here fetching the metadata
    console.log("Metadata URI from the ListItem component", metadataURI)
    const { data, error } = useSWR(
        `https://ipfs.infura.io/ipfs/${metadataURI}`,
        fetcher
    )

    if (error) {
        console.log("Error while fetching file metadata: ", error)
        return <div>Failed to Load...Reloading the page might help.</div>
    }

    if (!data) {
        return (
            <div>
                <div
                    style={{
                        backgroundColor: "#ECECFC",
                        borderRadius: "8px",
                        padding: "20px",
                    }}
                >
                    <Loading size={40} spinnerColor="#2E7DAF" />
                </div>
            </div>
        )
    }

    if (data) {
        console.log(data)
        return (
            <div>
                <div className="mt-2 mb-3">
                    <div className="card w-3/4 bg-primary text-primary-content mx-auto">
                        <div className="card-body">
                            <h2 className="card-title" title="file name"><span className="hover:underline">{data.name}</span></h2>
                            <p>
                                <span className="font-semibold hover:underline">
                                    Date of Upload:
                                </span>{" "}
                                {data.dateOfUpload.slice(0,10)}
                            </p>
                            <p>
                                <span className="font-semibold hover:underline">
                                    File URI:
                                </span>{" "}
                                {truncatStr(data.fileIpfsHash, 40)}
                            </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-secondary btn-sm">
                                    <a
                                        href={`https://ipfs.infura.io/ipfs/${data.fileIpfsHash}`}
                                        target="_blank"
                                    >
                                        View File
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
