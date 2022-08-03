import { useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { Modal, Input, Select, IPFSInput, useNotification } from "web3uikit"
import networkMapping from "../constants/networkMapping.json"
import PatientMedicalRecordSystemAbi from "../constants/PatientMedicalRecordSystem.json"

export default function AddPatientModal({ isVisible, onClose }) {
    const dispatch = useNotification()

    const [patientAddressToAddTo, setPatientAddressToAddTo] = useState("")
    const [category, setCategory] = useState(3)
    const [file, setFile] = useState(null)
    console.log(category)
    console.log(`file: ${file}`)
    const { chainId: chainHexId } = useMoralis()
    const chainId = chainHexId ? parseInt(chainHexId).toString() : "31337"
    const medicalRecordSystemAddress =
        networkMapping[chainId].PatientMedicalRecordSystem[0]

    // console.log("I am contract address", medicalRecordSystemAddress)
    // console.log("I am chain Id: ", chainId)
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



        // ---------Here I am getting the contract function which has to be run for addPatientDetails -----------------------
        const { runContractFunction: addPatientDetails } = useWeb3Contract({
            abi: PatientMedicalRecordSystemAbi,
            contractAddress: medicalRecordSystemAddress,
            functionName: "addPatientDetails",
            params: {
                _patientAddress: patientAddressToAddTo, /////////////Here this will be inputted by the doctor
                _category: category, //This will be chosen by the doctor
                _IpfsHash: "2lkjlkjf", //This will be the Ipfs hash of the encrypted file uploaded by the doctor.
            },
        })

        //Acutaly calling the function. [This is where the transaction initiation actually begins].

        addPatientDetails({
            onError: (error) => {
                console.log(error)
            },
            onSuccess: handleAddedPatientDetailsSuccess,
        })
    }

    return (
        <Modal
            isVisible={isVisible}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={initiateAddPatientDetailsTransaction}
            okButtonColor="blue"
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

            <div classNameName="gap-2">
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
                    traditionalHTML5
                    validation={{
                        required: true,
                    }}
                />
            </div>

            <div className="mt-3 mb-3">
                <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 font-semibold"
                    for="file_input"
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
