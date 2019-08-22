import React from 'react'
import {gql} from 'apollo-boost'
import { Query } from 'react-apollo'

export const GET_EMPLOYES = gql`
{
  employees{
    firstName
    lastName
  }
}
`

const withEmployees = Component => props => (
  <Query query={GET_EMPLOYES}>
    {({ loading, data,error }) =>{ 
     console.log("THis is query data",data)
     console.log("THis is query error",error)
     return(
      <Component
        loading={loading}
        employes={data && data.employees}
        {...props}
      />)}
    }
  </Query>
)


export default withEmployees
