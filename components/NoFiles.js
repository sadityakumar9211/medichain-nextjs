import {Table} from "web3uikit"

export default function NoFiles({customText}) {
    let additionalText
    if(customText === "Accident"){
        additionalText="s "
    }else if(customText === "Vaccination"){
        additionalText=" "
    }else if(customText === "Chronic" || customText === "Acute"){
        additionalText=" Illness"
    }
    return (
        <div className="mx-auto">
            <Table
                columnsConfig="80px 1fr 1fr 1fr 80px"
                customNoDataText={`No Medical Reports related to ${customText}${additionalText} are available.`}
                data={[]}
                header={[
                    "",
                    <span>File Name</span>,
                    <span>IPFS URI</span>,
                    <span>Date</span>,
                    <span>Show QR</span>,
                    "",
                ]}
                // maxPages={3}
                // onPageNumberChanged={function noRefCheck() {}}
                // onRowClick={function noRefCheck() {}}
                // pageSize={5}
            />
        </div>
    )
}
