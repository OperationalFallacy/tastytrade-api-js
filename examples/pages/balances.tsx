import React, {useContext} from 'react'
import { AppContext } from '../contexts/context';
import _ from 'lodash'
import UseHttpRequest from '../components/use-http-request';
import CustomTable from '../components/custom-table';

export default function Balances() {
    const context = useContext(AppContext);

    const { isLoading, errorMessage, executeRequest, responseData } = UseHttpRequest(async () => (
        context.tastytradeApi.balancesAndPositionsService.getAccountBalanceValues(context.accountNumbers![0])
      ), true)

    if (isLoading) {
        return <div>Loading...</div>
      }

    const balances = responseData

    if (_.isNil(context.accountNumbers)) {
      return <p>Loading...</p>
    }

    if (_.isEmpty(balances)) {
      return (
        <div>
          <h1>Transactions for {context.accountNumbers[0]}</h1>
          No Balances
          </div>
        )
      }
  
    return (
    <div>
        <h1>Balances for {context.accountNumbers[0]}</h1>
        {errorMessage && <div>{errorMessage}</div>}
        <CustomTable tableInformation={balances}/>
    </div>
    );
};
