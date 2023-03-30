import Head from "next/head"
import { Loading } from "@web3uikit/core"
import Header from "../components/Header"
import PatientWorkflow from "../components/PatientWorkflow"
import { useQuery } from "@apollo/client"
import networkMapping from "../constants/networkMapping.json"
import { GET_ADDED_PATIENTS } from "../constants/subgraphQueries"
import PatientProfile from "../components/PatientProfile"
import NotRegisteredPatient from "../components/NotRegisteredPatient"
import { useNetwork, useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function PatientDashboard() {
    const { address: account, isConnected } = useAccount()

    const { chain } = useNetwork()

    const chainId = chain?.id || "31337"
    // console.log(chainId)

    const patientMedicalRecordSystemAddress =
        networkMapping[chainId].PatientMedicalRecordSystem[0]
    const {
        loading: fetchingAddedPatients,
        error,
        data: addedPatients,
    } = useQuery(GET_ADDED_PATIENTS)

    if (error) {
        console.log(error)
        router.push({ pathname: "/error", query: { message: error.message } })
    }

    if (fetchingAddedPatients || !addedPatients) {
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

    if (addedPatients) {
        let isRegistered = false
        let patientAddresses
        if (!fetchingAddedPatients && addedPatients) {
            patientAddresses = addedPatients.addedPatients.map(
                (patient) => patient.patientAddress
            )
            if (patientAddresses.includes(account)) {
                isRegistered = true
            }
        }

        return (
            <div className="container mx-auto overflow-x-hidden h-screen">
                <Head>
                    <title>MediChain - Patient Dashboard</title>
                    <meta
                        name="description"
                        content="MediChain - Patient Dashboard"
                    />
                    <link rel="icon" href="/logo.svg" />
                </Head>
                <Header />
                <div className="container">
                    <div className="py-4 px-3 font-bold text-4xl ml-12">
                        Patient Dashboard
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
                    <div className="mx-auto ml-14">
                        <ConnectButton label="Connect" />
                    </div>

                    <div className="ml-10 w-4/6">
                        {isConnected ? (
                            fetchingAddedPatients || !addedPatients ? (
                                <div
                                    style={{
                                        backgroundColor: "#ECECFE",
                                        borderRadius: "6px",
                                        padding: "15px",
                                    }}
                                    className="ml-10 mt-5"
                                >
                                    <Loading
                                        direction="right"
                                        fontSize={14}
                                        size={16}
                                        spinnerColor="rgba(91, 96, 222, 0.8)"
                                        spinnerType="wave"
                                        text="Loading Profile..."
                                    />
                                </div>
                            ) : isRegistered ? (
                                addedPatients.addedPatients.map((patient) => {
                                    patientAddresses.push(
                                        patient.patientAddress
                                    )
                                    if (patient.patientAddress === account) {
                                        const {
                                            name,
                                            patientAddress,
                                            dateOfRegistration,
                                            dob,
                                            phoneNumber,
                                            bloodGroup,
                                            vaccinationHash,
                                            accidentHash,
                                            chronicHash,
                                            acuteHash,
                                        } = patient
                                        return (
                                            <div key={patientAddress}>
                                                <PatientProfile
                                                    key={patientAddress}
                                                    name={name}
                                                    patientAddress={
                                                        patientAddress
                                                    }
                                                    dateOfRegistration={
                                                        dateOfRegistration
                                                    }
                                                    dob={dob}
                                                    phoneNumber={phoneNumber}
                                                    bloodGroup={bloodGroup}
                                                    vaccinationHash={
                                                        vaccinationHash
                                                    }
                                                    accidentHash={accidentHash}
                                                    chronicHash={chronicHash}
                                                    acuteHash={acuteHash}
                                                />
                                            </div>
                                        )
                                    }
                                })
                            ) : (
                                <NotRegisteredPatient account={account} />
                            )
                        ) : (
                            <div>
                                <PatientWorkflow />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

/* 1. registered patients can view their details. 
                        
2. Registered patients can add diagnostic tests and diagnosis details in a particular patient's record. For this Add a Button which opens a modal form.
*/
