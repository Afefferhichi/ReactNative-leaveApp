import React from 'react';
import {gql} from 'apollo-boost';

export const Create_Leave = gql`
mutation createcong($input: congeInput!) {
  createConge(conge: $input) {
   congeState,
  start_Date,
  end_Date,
  employeeId,
  half_Day,
  id,
  motif,
  reason
  }
  }
;
 function createcong() {
  let input;
  const [createConge, { data }] = useMutation(Create_Leave);
 } 

  ;
;
