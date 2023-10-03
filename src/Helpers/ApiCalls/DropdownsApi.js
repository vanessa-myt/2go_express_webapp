import { getAPICall, postAPICall, putAPICall, deleteAPICall, API_KEY, TOKEN } from './axiosMethodCalls';

// Countries API
export const fetchCountries = async () => {
    try {
        // console.log()
        console.log("applink",process.env.REACT_APP_LINK )
        const response = await postAPICall( process.env.REACT_APP_LINK + 'countries/get');
  
        console.log(response);
        return ({data:response.data.data});   
    } catch (error) {
        return ({error: error.response});
    }
  }

  // Validate Postal API
export const validatePostal = async (country_code, postal_code, state_code) => {
    try {
        const response = await postAPICall( process.env.REACT_APP_LINK + 'public_fedex_transactions/validate_postal_code');
        
       
        // console.log(response);
        return ({data:response.data});   
    } catch (error) {
        return ({error: error.response});
    }
  }
  
  // Fedex Package API
  export const fetchPackages = async () => {
    try {
        const response = await postAPICall( process.env.REACT_APP_LINK + 'fedex_packages/get');
  
        // console.log(response.data);
        return ({data:response.data});   
    } catch (error) {
        return ({error: error.response});
    }
  }
  
  // Fedex Services API
  export const fetchServices = async () => {
    try {
        const response = await postAPICall( process.env.REACT_APP_LINK + 'fedex_services/get');
  
        // console.log(response);
        return ({data:response.data.data});   
    } catch (error) {
        return ({error: error.response});
    }
  }