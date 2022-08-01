import { getAPICall, postAPICall, putAPICall, deleteAPICall, API_KEY, TOKEN } from './axiosMethodCalls';

  // --- SAVE BOOKING ( FEDEX )
export const bookingConfirmation = async (details, service_id, transaction_id, base_rate, surcharge, discountAmount, subtotal, vat, amount, sender, recipient, upper, package_details, package_specifics) => {
  try {

    var data = {
      base_rate: base_rate,
      surcharge: surcharge,
      discount: discountAmount,
      subtotal: subtotal.toString(),
      vat: vat,
      amount: amount.toString(),

      ...sender,
      ...recipient,
      ...upper,
      ...package_details,
      ...package_specifics

    };

    // console.log(data);

    const response = await postAPICall( process.env.REACT_APP_LINK + 'payments/create_shipment_payments', {...data});

    // console.log(response);
    return ({data:response});   
  } catch (error) {
      return ({error: error.response});
  }
}