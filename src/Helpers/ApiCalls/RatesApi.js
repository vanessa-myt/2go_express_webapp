import { getAPICall, postAPICall, putAPICall, deleteAPICall, API_KEY, TOKEN } from './axiosMethodCalls';

// Create Fedex Transaction API
export const createFedexTransac = async (sender, recipient, upper, package_details, package_specifics) => {
    try {
        // recipient.ship_date = recipient.ship_date.getMonth()+1 + "/" + recipient.ship_date.getDate() +"/"+ recipient.ship_date.getFullYear()

        const payload = {
          //...currentuser,
          ...sender,
          ...recipient,
          ...upper,
          ...package_details,
          ...package_specifics
        }
        // console.log("payload_under")
        // console.log(payload)
        const response = await postAPICall( 'https://uat-api.2gosuite.2go.com.ph/' + 'public_fedex_transactions/compute_rates_and_transit', {
          ...payload
        });
         console.log(response);
        return ({data:response.data});   
    } catch (error) {
        return ({error: error.response});
    }
  }

