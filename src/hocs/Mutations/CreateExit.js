import React from 'react';
import {gql} from 'apollo-boost';

export const Create_Exit = gql`
mutation createsort($input : sortieInput!) {
  createSortie(sortie: $input) {
  employeeId,
    recovery_Date,
    sortie_Date,
    sortieTime,
    sortieState,
    motif
  }
}
  `;
 //function createsort() {
  const createsort = () => {
  
    return (
      <Mutation mutation={Create_Exit}>
        {(createSortie, { data }) => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
               createSortie({ variables: { sortie: input.value } });
                input.value = "";
              }}
            >
            </form>
          </div>
        )}
      </Mutation>
    );
  };