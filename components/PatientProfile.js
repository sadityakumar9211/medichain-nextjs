import Link from "next/link"
import truncatStr from "../utils/truncateString"
import timestampToDate from "../utils/timestampToDate"
import { useState } from "react"
import PatientMedicalRecordSystemAbi from "../constants/PatientMedicalRecordSystem.json"
import { Tab, TabList } from "web3uikit"
import ListMedicalFiles from "./ListMedicalFiles"

export default function PatientProfile({
    name,
    patientAddress,
    dob,
    phoneNumber,
    bloodGroup,
    dateOfRegistration,
    vaccinationHash,
    accidentHash,
    chronicHash,
    acuteHash,
}) {
    const [showModal, setShowModal] = useState(false)

    const handleButtonClick = () => {
        // show the modal
        setShowModal(true)
    }

    return (
        <div>
            <div>
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

                <div className="mt-5">
                    <TabList
                        isWidthAuto
                        onChange={function noRefCheck() {}}
                        tabStyle="bulbUnion"
                    >
                        <Tab lineHeight={25} tabKey={1} tabName="Vaccination">
                            <div><ListMedicalFiles /></div>    
                        </Tab>
                        <Tab lineHeight={25} tabKey={2} tabName="Chronic">
                            <div><ListMedicalFiles /></div>
                        </Tab>
                        <Tab lineHeight={25} tabKey={3} tabName="Accidental">
                            <div><ListMedicalFiles /></div>
                        </Tab>
                        <Tab lineHeight={25} tabKey={4} tabName="Acute">
                            <div><ListMedicalFiles /></div>
                        </Tab>
                    </TabList>
                </div>
            </div>
        </div>
    )
}
