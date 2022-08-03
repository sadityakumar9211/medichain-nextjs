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

export { GET_ADDED_DOCTORS }
