import { gql } from "@apollo/client"

const GET_ADDED_DOCTORS = gql`
    {
        addedDoctors(first: 10) {
            id
            name
            doctorAddress
            dateOfRegistration
            specialization
            hospitalAddress
        }
    }
`


const GET_ADDED_HOSPITALS = gql`
    {
        addedHospitals(first: 10) {
            id
            name
            hospitalAddress
            email
            phoneNumber
        }
    }
`

export { GET_ADDED_DOCTORS, GET_ADDED_HOSPITALS }
