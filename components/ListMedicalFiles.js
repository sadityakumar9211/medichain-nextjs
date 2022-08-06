import ListFile from "./ListFile"
import { TabList, Tab } from "web3uikit"

export default function ListMedicalFiles({
    vaccinationHash,
    chronicHash,
    accidentHash,
    acuteHash,
}) {
    return (
        <div>
            <div className="mt-5">
                <TabList
                    isWidthAuto
                    onChange={function noRefCheck() {}}
                    tabStyle="bulbUnion"
                >
                    <Tab lineHeight={25} tabKey={1} tabName="Vaccination">
                        <div>
                            <ListFile
                                fileMetadataHash={vaccinationHash}
                                customText="Vaccination"
                            />
                        </div>
                    </Tab>
                    <Tab lineHeight={25} tabKey={2} tabName="Chronic">
                        <div>
                            <ListFile
                                fileMetadataHash={chronicHash}
                                customText="Chronic"
                            />
                        </div>
                    </Tab>
                    <Tab lineHeight={25} tabKey={3} tabName="Accidental">
                        <div>
                            <ListFile
                                fileMetadataHash={accidentHash}
                                customText="Accident"
                            />
                        </div>
                    </Tab>
                    <Tab lineHeight={25} tabKey={4} tabName="Acute">
                        <div>
                            <ListFile
                                fileMetadataHash={acuteHash}
                                customText="Acute"
                            />
                        </div>
                    </Tab>
                </TabList>
            </div>
        </div>
    )
}
