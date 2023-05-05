import Head from "next/head"
import { useRouter } from "next/router"
import { useNotification, Modal, Input } from "@web3uikit/core"
import Header from "../components/Header"
import OwnerWorkflow from "../components/OwnerWorkflow"
import { useState, useEffect } from "react"
import PatientMedicalRecordSystemAbi from "../constants/PatientMedicalRecordSystem.json"
import networkMapping from "../constants/networkMapping.json"
import dateInUnix from "../utils/dateInUnix"

import { useAccount, useNetwork } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import {
    useContractRead,
    usePrepareContractWrite,
    useContractWrite,
} from "wagmi"

export default function OwnerDashboard() {
    const dispatch = useNotification()

    const [isOwner, setIsOwner] = useState(false)
    const [showAddHospitalModal, setShowAddHospitalModal] = useState(false)
    const [showAddDoctorModal, setShowAddDoctorModal] = useState(false)
    const [cancelDisabled, setCancelDisabled] = useState(false)
    const [okDisabled, setOkDisabled] = useState(false)

    const [doctorAddressToAddTo, setDoctorAddressToAddTo] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [doctorRegistrationId, setDoctorRegistrationId] = useState("")
    const [doctorSpecialization, setDoctorSpecialization] = useState("")
    const [doctorHospitalAddress, setDoctorHospitalAddress] = useState("")

    const [hospitalAddressToAddTo, setHospitalAddressToAddTo] = useState("")
    const [hospitalName, setHospitalName] = useState("")
    const [hospitalRegistrationId, setHospitalRegistrationId] = useState("")
    const [hospitalEmail, setHospitalEmail] = useState("")
    const [hospitalPhoneNumber, setHospitalPhoneNumber] = useState("")

    const router = useRouter()
    const { isConnected, address: account } = useAccount()
    const { chain } = useNetwork()
    const chainId = chain?.id || "31337"

    const medicalRecordSystemAddress =
        networkMapping[chainId].PatientMedicalRecordSystem[0]

    const {
        contractOwner,
        isError: isGetOwnerError,
        isLoading: isGetOwnerLoading,
        error: getOwnerError,
    } = useContractRead({
        address: medicalRecordSystemAddress,
        abi: PatientMedicalRecordSystemAbi,
        functionName: "getOwner",
    })

    useEffect(() => {
      if (! isGetOwnerError && ! isGetOwnerLoading) {
        console.log("Contract Owner: ", contractOwner)
      }
      if (isGetOwnerError) {
        console.log("Error in getting owner of the contract")
        console.log({getOwnerError})
      }
    })

    // verifying if the current user is the owner of the contract or not.
    const handleVerificationClick = async () => {
        if (isGetOwnerError) {
            console.log("Error while calling getOwner function")
            router.push({
                pathname: "/error",
                query: { message: getOwnerError.message },
            })
        } else if (
            !isGetOwnerLoading &&
            contractOwner?.toString()?.toLowerCase() ===
                account?.toString()?.toLowerCase()
        ) {
            dispatch({
                type: "success",
                title: "Successfully Verified",
                message:
                    "Ownership Successfully Verified. You can now perform following functions",
                position: "bottomL",
            })
            setIsOwner(true)
        } else {
            dispatch({
                type: "error",
                title: "Verification Failed",
                message: `As per our records ${contractOwner} is the owner of this smart contract.`,
                position: "bottomL",
                isClosing: false,
            })
        }
    }
    const onCloseDoctorModal = () => {
        setShowAddDoctorModal(false)
    }
    const onCloseHospitalModal = () => {
        setShowAddHospitalModal(false)
    }

    const handleAddDoctorClick = async () => {
        setShowAddDoctorModal(true)
    }

    const handleAddHospitalClick = async () => {
        setShowAddHospitalModal(true)
    }

    // showing success notification when a new doctor is added in the system.
    const handleAddDoctorSuccess = async () => {
        dispatch({
            type: "success",
            title: "Transaction Successful",
            message:
                "Doctor Details Successfully Added. You can now add more doctors",
            position: "bottomL",
        })
        setShowAddDoctorModal(false)
        onCloseDoctorModal && onCloseDoctorModal() //closing the modal on success
    }

    const initiateAddDoctorTransaction = async () => {
        console.log("Initiate Add Doctor Transaction")
        setCancelDisabled(true)
        setOkDisabled(true)

        const {
            config: addDoctorDetailsConfig,
            error: addDoctorDetailsConfigError,
        } = usePrepareContractWrite({
            address: medicalRecordSystemAddress,
            abi: PatientMedicalRecordSystemAbi,
            functionName: "addDoctorDetails",
            args: [
                doctorAddressToAddTo,
                doctorName,
                doctorRegistrationId,
                dateInUnix(new Date()),
                doctorSpecialization,
                doctorHospitalAddress,
            ],
        })

        if (addDoctorDetailsConfigError) {
            console.log("Error while preparing addDoctorDetails Transaction")
            router.push({
                pathname: "/error",
                query: { message: addDoctorDetailsConfigError.message },
            })
        }

        const {
            error: addDoctorDetailsError,
            isError: isAddDoctorDetailsTxError,
            isLoading: isLoadingAddDoctorDetails,
            isSuccess: isSuccessAddDoctorDetails,
            write: writeAddDoctorDetails,
        } = useContractWrite(addDoctorDetailsConfig)

        if (isAddDoctorDetailsTxError) {
            console.log("Error while calling addDoctorDetails function")
            router.push({
                pathname: "/error",
                query: { message: addDoctorDetailsError.message },
            })
        } else if (isSuccessAddDoctorDetails) {
            await handleAddDoctorSuccess()
        }

        setCancelDisabled(false)
        setOkDisabled(false)
    }

    // showing success notification when a new hospital is added in the system.
    const handleAddHospitalSuccess = async () => {
        dispatch({
            type: "success",
            title: "Transaction Successful",
            message:
                "Hospital Details Successfully Added. You can now add more hospitals",
            position: "bottomL",
        })
        setShowAddHospitalModal(false)
        onCloseHospitalModal && onCloseHospitalModal() //closing the modal on success
    }

    // adding a new hospital in the system.
    const initiateAddHospitalTransaction = async () => {
        console.log("Initiate Add Hospital Transaction")
        setCancelDisabled(true)
        setOkDisabled(true)

        const {
            config: addHospitalDetailsConfig,
            error: addHospitalDetailsConfigError,
        } = usePrepareContractWrite({
            address: medicalRecordSystemAddress,
            abi: PatientMedicalRecordSystemAbi,
            functionName: "addHospitalDetails",
            args: [
                hospitalAddressToAddTo,
                hospitalName,
                hospitalRegistrationId,
                hospitalEmail,
                hospitalPhoneNumber,
            ],
        })

        const {
            data,
            error: addHospitalDetailsError,
            isError: isAddHospitalDetailsTxError,
            isLoading: isLoadingAddHospitalDetails,
            isSuccess: isSuccessAddHospitalDetails,
            write: writeAddHospitalDetails,
        } = useContractWrite(addHospitalDetailsConfig)

        if (addHospitalDetailsConfigError) {
            console.log(
                "Error while preparing add addHospitalDetails function",
                addHospitalDetailsConfigError
            )
            router.push({
                pathname: "/error",
                query: { error: addPatientDetailsConfigError },
            })
        }

        writeAddHospitalDetails?.()

        if (isAddHospitalDetailsTxError) {
            console.log(
                "Error while preparing registerPatient function",
                addHospitalDetailsError
            )
        } else {
            if (isSuccessAddHospitalDetails) {
                await handleAddHospitalSuccess()
            }
        }

        setCancelDisabled(false)
        setOkDisabled(false)
    }

    return (
        <div className="container mx-auto h-screen overflow-x-hidden">
            <Head>
                <title>MediChain - Owner Dashboard</title>
                <meta
                    name="description"
                    content="MediChain - Owner Dashboard"
                />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Header />
            <div className="container">
                <div>
                    <div className="py-4 px-3 font-bold text-4xl ml-12">
                        Owner Dashboard
                        {isConnected ? (
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
                        <ConnectButton label="Owner Dashboard - Sign in" />
                    </div>
                    <div className="mx-auto ml-12 w-3/4">
                        {isConnected ? (
                            isOwner ? (
                                <div className="mt-16 text-center">
                                    <button
                                        className="btn btn-primary mr-5"
                                        onClick={handleAddDoctorClick}
                                    >
                                        Add a Doctor
                                    </button>
                                    <button
                                        className="btn btn-secondary mr-5"
                                        onClick={handleAddHospitalClick}
                                    >
                                        Add a Hospital
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center mt-16">
                                    <button
                                        className="btn mr-5"
                                        onClick={handleVerificationClick}
                                    >
                                        Verify Ownership
                                    </button>
                                    <button className="btn">
                                        <a
                                            href={`https://goerli.etherscan.io/address/${medicalRecordSystemAddress}`}
                                            target="_blank"
                                        >
                                            View on Etherscan
                                        </a>
                                    </button>
                                </div>
                            )
                        ) : (
                            <div>
                                <OwnerWorkflow />
                            </div>
                        )}
                    </div>

                    <Modal
                        isVisible={showAddDoctorModal}
                        onCancel={onCloseDoctorModal}
                        onCloseButtonPressed={onCloseDoctorModal}
                        onOk={initiateAddDoctorTransaction}
                        isCancelDisabled={cancelDisabled}
                        isOkDisabled={okDisabled}
                        width="63vw"
                    >
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's account address"
                                name="Doctor Account Address"
                                type="text"
                                onChange={(event) => {
                                    setDoctorAddressToAddTo(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's name"
                                name="Doctor Name"
                                type="text"
                                onChange={(event) => {
                                    setDoctorName(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's Registration Id"
                                name="Doctor Registration Id"
                                type="text"
                                onChange={(event) => {
                                    setDoctorRegistrationId(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's Specialization"
                                name="Doctor Specialization"
                                type="text"
                                onChange={(event) => {
                                    setDoctorSpecialization(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Doctor's Hospital Account Address"
                                name="Doctor Hospital Address"
                                type="text"
                                onChange={(event) => {
                                    setDoctorHospitalAddress(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                    </Modal>

                    <Modal
                        isVisible={showAddHospitalModal}
                        onCancel={onCloseHospitalModal}
                        onCloseButtonPressed={onCloseHospitalModal}
                        onOk={initiateAddHospitalTransaction}
                        isCancelDisabled={cancelDisabled}
                        isOkDisabled={okDisabled}
                        width="63vw"
                    >
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's account address"
                                name="Hospital Account Address"
                                type="text"
                                onChange={(event) => {
                                    setHospitalAddressToAddTo(
                                        event.target.value
                                    )
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's name"
                                name="Hospital Name"
                                type="text"
                                onChange={(event) => {
                                    setHospitalName(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's Registration Id"
                                name="Hospital Registration Id"
                                type="text"
                                onChange={(event) => {
                                    setHospitalRegistrationId(
                                        event.target.value
                                    )
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's Email"
                                name="Hospital Email"
                                type="text"
                                onChange={(event) => {
                                    setHospitalEmail(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                        <div className="mb-5">
                            <Input
                                label="Enter Hospital's Phone Number"
                                name="Hospital Phone Number"
                                type="text"
                                onChange={(event) => {
                                    setHospitalPhoneNumber(event.target.value)
                                }}
                                width="full"
                                validation={{
                                    required: true,
                                }}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

/* 
                        1. Possibly show the list of all the doctors registered in the system. (show the list of details of all the doctors)
                        2. Possibly show the list of all the hospitals registered in the system. (show the list of details of all the hospitals)
                          */
