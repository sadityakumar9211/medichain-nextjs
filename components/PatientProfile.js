import Link from "next/link"
import truncatStr from "../utils/truncateString"
import timestampToDate from "../utils/timestampToDate"
import { useState } from "react"
import PatientMedicalRecordSystemAbi from "../constants/PatientMedicalRecordSystem.json"
import { Tab, TabList } from "web3uikit"
import ListMedicalFiles from "./ListMedicalFiles"
import { Modal, Input, useNotification } from "web3uikit"
import NodeRSA from "node-rsa"
import useSWR from "swr"
import returnUriFromCid from "../utils/returnUriFromCid"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function PatientProfile({
    name,
    patientAddress,
    dob,
    phoneNumber,
    bloodGroup,
    dateOfRegistration,
    //arrays of encrypted IPFS file metadatas.
    vaccinationHash,
    accidentHash,
    chronicHash,
    acuteHash,
}) {
    const dispatch = useNotification()
    const [privateKey, setPrivateKey] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showFiles, setShowFiles] = useState(false)
    const [haveVaccinationFile, setHaveVaccinationFile] = useState(
        vaccinationHash && Boolean(vaccinationHash.length)
    )
    const [haveChronicFile, setHaveChronicFile] = useState(
        chronicHash && Boolean(chronicHash.length)
    )
    const [haveAccidentFile, setHaveAccidentFile] = useState(
        accidentHash && Boolean(accidentHash.length)
    )
    const [haveAcuteFile, setHaveAcuteFile] = useState(
        acuteHash && Boolean(acuteHash.length)
    )
    const [iscorrectlyDecrypted, setIsCorrectlyDecrypted] = useState(true)
    const [showErrorModal, setShowErrorModal] = useState(!iscorrectlyDecrypted)

    const handleClick = () => {
        setShowModal(true)
    }

    const onClose = () => {
        showErrorModal(false)
    }
    const decryptHash = (encryptedHash) => {
        console.log(encryptedHash)
        const key_private = new NodeRSA(privateKey)
        const decryptedHash = key_private.decrypt(encryptedHash, "utf8")
        console.log(decryptedHash)
        return decryptedHash
    }

    const verifyDecryption = (potentiallyDecryptedHashes) => {
        const firstDecryptedHash = potentiallyDecryptedHashes[0]
        const { data, error } = useSWR(returnUriFromCid(firstDecryptedHash))

        //error will be coming when timed out or anything else happens
        if (error) {
            return false
        }
        if (data) {
            return true
        }
    }

    const handleOkPressed = () => {
        //decrypting the IPFS hashes and storing decrypted IPFS file metadatas in the same array
        haveVaccinationFile &&
            vaccinationHash.forEach((encryptedHash, index) => {
                vaccinationHash[index] = decryptHash(encryptedHash)
            })
        haveAccidentFile &&
            accidentHash.forEach((encryptedHash, index) => {
                accidentHash[index] = decryptHash(encryptedHash)
            })
        haveChronicFile &&
            chronicHash.forEach((encryptedHash, index) => {
                chronicHash[index] = decryptHash(encryptedHash)
            })
        haveAcuteFile &&
            acuteHash.forEach((encryptedHash, index) => {
                acuteHash[index] = decryptHash(encryptedHash)
            })

        //If it has no files in any category
        if (
            !(
                haveAccidentFile &&
                haveChronicFile &&
                haveAcuteFile &&
                haveVaccinationFile
            )
        ) {
            dispatch({
                type: "warning",
                title: "No Files Found",
                message: "You don't have any medical file in the database yet!",
                position: "topL",
            })
            showModal && setShowModal(false)
            return
        } else {
            //at least one of these has to be true
            if (haveAccidentFile) {
                setIsCorrectlyDecrypted(verifyDecryption(accidentHash))
            } else if (haveChronicFile) {
                setIsCorrectlyDecrypted(verifyDecryption(chronicHash))
            } else if (haveAcuteFile) {
                setIsCorrectlyDecrypted(verifyDecryption(acuteHash))
            } else if (haveVaccinationFile) {
                setIsCorrectlyDecrypted(verifyDecryption(vaccinationHash))
            }

            dispatch({
                type: "success",
                title: "Files Decrypted Successfully",
                position: "topL",
            })
        }
        setShowFiles(true)
    }

    return (
        <div>
            <div>
                <div>
                    <Modal
                        isVisible={showModal}
                        onCancel={() => {
                            setPrivateKey("")
                            setShowModal(false)
                        }}
                        onCloseButtonPressed={() => {
                            setPrivateKey("")
                            setShowModal(false)
                        }}
                        onOk={handleOkPressed}
                        isOkDisabled={!Boolean(privateKey)}
                    >
                        <div className="mt-b mb-8">
                            <div className="mb-5 mt-3">
                                <span className="font-semibold">
                                    Important:{" "}
                                </span>{" "}
                                Copy-Paste your Private Key from the text file
                                downloaded while registering to the system. We
                                will not store it and only use to decrypt the
                                IPFS hashes locally.
                            </div>
                            <Input
                                label="Enter your private key here"
                                name="Patient Private Key"
                                autoFocus={true}
                                type="password"
                                width="full"
                                onChange={(event) => {
                                    setPrivateKey(event.target.value)
                                }}
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                    </Modal>
                </div>
                <div className="md:w-fit md:mx-auto w-full mx-auto bg-sky-200 bg-opacity-80 mt-10 p-5 rounded-lg hover:bg-opacity-100">
                    <div className="card p-4 hover">
                        <div className="mb-1">
                            <span>
                                <span className="font-sans md:text-xl font-medium hover:underline">
                                    Name
                                </span>
                                :{" "}
                                <span className="font-serif md:text-xl font-normal">
                                    {name}
                                </span>
                            </span>
                            <span className="badge badge-warning ml-5 md:p-2.5">
                                {bloodGroup}
                            </span>
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Patient Account Address
                            </span>
                            :{" "}
                            <a
                                className="badge ml-3 md:p-2 px-4"
                                title="view on etherscan"
                                target="_blank"
                                href={
                                    "https://rinkeby.etherscan.io/address/" +
                                    patientAddress
                                }
                            >
                                {truncatStr(patientAddress, 25)}
                            </a>
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Date of Birth
                            </span>
                            :{" "}
                            <a className="badge ml-3 md:p-2 px-4">
                                {timestampToDate(dob)}
                            </a>
                        </div>
                        <div className="mb-1">
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Date of Registration
                            </span>
                            :{" "}
                            <a className="badge ml-3 md:p-2 px-4">
                                {timestampToDate(dateOfRegistration)}
                            </a>
                        </div>
                        <div>
                            <span className="font-sans md:text-xl font-medium hover:underline">
                                Phone Number
                            </span>
                            :{" "}
                            <span className="badge badge-accent">
                                {phoneNumber}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    {!showFiles ? (
                        <div className="text-center">
                            <button
                                className="btn btn-primary btn-md mt-8"
                                onClick={handleClick}
                            >
                                View Medical Files
                            </button>
                        </div>
                    ) : iscorrectlyDecrypted ? (
                        <div>
                            <ListMedicalFiles
                                vaccinationHash={vaccinationHash}
                                acuteHash={acuteHash}
                                accidentHash={accidentHash}
                                chronicHash={chronicHash}
                            />
                        </div>
                    ) : (
                        <div>
                            <div
                                style={{
                                    height: "90vh",
                                    transform: "scale(1)",
                                }}
                            >
                                <div>
                                    <Modal
                                        isVisible={showErrorModal}
                                        okText="close"
                                        onCancel={onClose}
                                        onCloseButtonPressed={onClose}
                                        onOk={onClose}
                                        title="Decryption Failed"
                                    >
                                        <p
                                            style={{
                                                fontWeight: 600,
                                                marginRight: "1em",
                                                textAlign: "center",
                                            }}
                                        >
                                            File Decryption Unsucccessful due to
                                            Incorrect Private Key
                                        </p>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
