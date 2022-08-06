import { useEffect, useState } from "react"
import NoFiles from "./NoFiles"
import { Table, Avatar, Tag, SvgMoreVert, Modal } from "web3uikit"
import useSWR from "swr"
import { useNotification } from "web3uikit"
import returnUriFromCid from "../utils/returnUriFromCid"


const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function ListFile({ fileMetadataHash, customText }) {
    const [metadataArray, setMetadataArray] = useState([])
    const dispatch = useNotification()
    // const [haveFiles, setHaveFiles] = useState(Boolean(fileMetadataHash.length))
    // const [isCorrectlyDecrypted, setIsCorrectlyDecrypted] = useState(true)
    // console.log(fileMetadataHash)     //can be tested with file metadata [0] if it has that format.
    // console.log(haveFiles)

    //If the patient has no files in that field
    const haveFiles = Boolean(fileMetadataHash.length)
    if (haveFiles) {
        return (
            <div>
                <NoFiles customText={customText} />
            </div>
        )
    }

    //If he has decrypted hashes in the fileMetadataHash
    //making the get request to one of the fileMetadataHash and seeing of the request time out occurs or not.

    const firstFileMetadataHash = fileMetadataHash[0]
    const IpfsURI =
        "https://ipfs.infura.io/ipfs/QmbgxrzfUUy5Wsq2hntVbvDvqsqKLpvTs7kaA1xKnQzhCr"
    // const IpfsURI = `https://ipfs.infura.io/ipfs/${firstFileMetadataHash}`
    const { firstData, firstError } = useSWR(IpfsURI)

    if (!firstError && !firstData) {
        dispatch({
            type: "info",
            title: "Loading Your Data from IPFS",
            message: "This might take a while",
            position: "topL",
            isClosing: firstData || firstError,
        })
    }

    if (firstError) {
        console.log(firstError)
        dispatch({
            type: "error",
            title: "Request Timeout",
            message: "You may have entered incorrect PRIVATE KEY.",
            position: "topR",
            // isClosing: data || error,
        })
        return
    }

    let count = 0

    const fetchFiveOrLessMetadata = () => {
        for (let i = 0; count <= fileMetadataHash.length && i < 5; i++) {
            const { data, error } = useSWR(
                returnUriFromCid(fileMetadataHash[count])
            )
            if (!error && data) {
                count++
                //pushing this file metadata to the array of metadata's
                setMetadataArray([...metadataArray, data]) //one by one setting the metadata array.
            } else if (error) {
                console.log(error)
                dispatch({
                    type: "error",
                    title: "Couldn't load the data",
                    message: "HTTP Request Timed out",
                    position: "topR",
                    // isClosing: data || error,
                })
                return
            }
        }
    }

    //when the first request is successful, this means that the metadata hashes are decrypted correctly, means the private key is correctly entered.
    if (firstData) {
        console.log(firstData)
        //If the decryption is successful, then fetching 5 file metadata's and storing them in an array.
        fetchFiveOrLessMetadata()

        return (
            <div>
                <div className="mx-auto">
                    <Table
                        columnsConfig="60px 2fr 2fr 2fr 100px"
                        data={[["", "hello1", "hello2", "hello3", "hello4"]]}
                        header={[
                            "",
                            <span>File Name</span>,
                            <span>IPFS URI</span>,
                            <span>Date</span>,
                            <span>Show QR</span>,
                        ]}
                        maxPages={3}
                        onPageNumberChanged={function noRefCheck() {}}
                        onRowClick={function noRefCheck() {}}
                        pageSize={5}
                    />
                </div>
            </div>
        )
    }
}
