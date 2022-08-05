import { useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Modal, Input, Select, IPFSInput, useNotification } from "web3uikit"
import networkMapping from "../constants/networkMapping.json"
import PatientMedicalRecordSystemAbi from "../constants/PatientMedicalRecordSystem.json"
// import FileReader from "../utils/fileReader"
import { GET_PUBLIC_KEYS } from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"
import NodeRSA from "node-rsa"
import {create} from "ipfs-http-client"

export default function AddPatientModal({ isVisible, onClose }) {
    const dispatch = useNotification()
    const { runContractFunction } = useWeb3Contract()

    const [patientAddressToAddTo, setPatientAddressToAddTo] = useState("")
    const [category, setCategory] = useState(3)
    const [file, setFile] = useState(null)
    const { chainId: chainHexId } = useMoralis()

    const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"
    const medicalRecordSystemAddress =
        networkMapping[chainId].PatientMedicalRecordSystem[0]

    const {
        loading: fetchingAddedPublicKeys,
        error,
        data: addedPublicKeys,
    } = useQuery(GET_PUBLIC_KEYS)

    const handleAddedPatientDetailsSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            title: "Transaction Successful",
            message:
                "Patient Report added Successfully to the blockchain network",
            position: "topR",
        })
        onClose && onClose() //closing the modal on success
    }

    const convertCategoryToInt = (category) => {
        if (category === "Vaccination") {
            return 0
        } else if (category === "Accidental") {
            return 1
        } else if (category === "Chronic") {
            return 2
        } else if (category === "Acute") {
            return 3
        } else {
            return 3 //by default it is treated as acute.
        }
    }


    const initiateAddPatientDetailsTransaction = async () => {
        //Getting the parameters for the transaction
        //we have patientAddress, category and file.
        //we need to encrypt the file and upload the encrypted file to ipfs and get the hash.

        console.log("inside function patient Publick key:", addedPublicKeys)
        let patientPublicKey
        if(!fetchingAddedPublicKeys && addedPublicKeys){
            for(let item of addedPublicKeys.addedPublicKeys){
                if(item.patientAddress.toString().toLowerCase() == patientAddressToAddTo.toString().toLocaleLowerCase()){
                    patientPublicKey = item.publicKey
                }
                // console.log("popo", item.patientAddress)
                // console.log("jojo", patientAddressToAddTo)
                // console.log("doodod", patientPublicKey)
            }    //handle the case where the addresses doesnot match
        }
        // console.log('inside function : ', patientPublicKey)


        //uploading file to ipfs
        const client = create('https://ipfs.infura.io:5001/api/v0')

        const IpfsHash = (await client.add(file)).path

        const publicKeyPatient = new NodeRSA(patientPublicKey)

        const encryptedIpfsHash = publicKeyPatient.encrypt(IpfsHash, 'base64')

        console.log('encryptedIpfsHash:', encryptedIpfsHash)

        const addPatientDetailsOptions = {
            abi: PatientMedicalRecordSystemAbi,
            contractAddress: medicalRecordSystemAddress,
            functionName: "addPatientDetails",
            params: {
                _patientAddress: patientAddressToAddTo, /////////////Here this will be inputted by the doctor
                _category: category, //This will be chosen by the doctor
                _IpfsHash: IpfsHash, //This will be the Ipfs hash of the encrypted file uploaded by the doctor.
            },
        }

        // //Acutaly calling the function. [This is where the transaction initiation actually begins].

        await runContractFunction({
            params: addPatientDetailsOptions,
            onError: (error) => {
                console.log(error)
            },
            onSuccess: handleAddedPatientDetailsSuccess,
        })      
    }

    console.log('public keys:', fetchingAddedPublicKeys? "null" : addedPublicKeys.addedPublicKeys[0].publicKey)

    return (
        <Modal
            isVisible={isVisible}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={initiateAddPatientDetailsTransaction}
        >
            <div className="mb-5">
                <Input
                    label="Enter Patient's account address"
                    name="Patient Account Address"
                    type="text"
                    onChange={(event) => {
                        setPatientAddressToAddTo(event.target.value)
                    }}
                />
            </div>

            <div className="gap-2">
                <Select
                    label="Choose Category"
                    onChangeTraditional={(event) => {
                        setCategory(convertCategoryToInt(event.target.value))
                    }}
                    options={[
                        {
                            id: "vaccination",
                            label: "Vaccination",
                        },
                        {
                            id: "accidental",
                            label: "Accidental",
                        },
                        {
                            id: "chronic",
                            label: "Chronic",
                        },
                        {
                            id: "acute",
                            label: "Acute",
                        },
                    ]}
                    validation={{
                        required: true,
                    }}
                />
            </div>

            <div className="mt-3 mb-3">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-semibold"
                    htmlFor="file_input"
                >
                    Upload file
                </label>
                <input
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                    onChange={(event) => {
                        setFile(event.target.files[0])
                    }}
                />
                <p
                    className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                    id="file_input_help"
                >
                    Upload the Patient Report to be encrypted and stored on the
                    blockchain.
                </p>
            </div>
        </Modal>
    )
}
