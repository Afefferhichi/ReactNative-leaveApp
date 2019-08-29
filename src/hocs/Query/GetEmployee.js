
import React from 'react';
import {gql} from 'apollo-boost';
import {Query} from 'react-apollo';


export const GET_EMPLOYEE = gql`
query employee($login: String!,$password: String!)
{login (login: $login, password: $password)
{id,
  firstName,
  lastName
}

}
`;

function GetEmployee() {
  const {loading, error, data} = useQuery(gql`
  {
   employee{
  id,
   firstName,
   lastName
   }
  }
  `);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }

  return data.employee.map(({currency, rate}) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

const withEmployee = Component => props => (
  <Query query={GET_EMPLOYEE}>
    {({loading, data, error}) => {
      console.log('THis is query data', data);
      console.log('THis is query error', error);
      return (
        <Component
          loading={loading}
          employe={data && data.employee}
          {...props}
        />);
    }
    }
  </Query>
);


export default withEmployee
;
