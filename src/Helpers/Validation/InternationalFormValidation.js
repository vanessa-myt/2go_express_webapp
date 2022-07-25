import { handleValidationChange } from "./CommonValidation";

export const validateSender = (data, citySelections, provinceSelections, setIsError) => {
    var isValid = true;
    var isValidFirstName = true;
    var isValidLastName = true;
    var isValidCity = true;
    var isValidState = true;
    var isValidPostal = true;
    var isValidAddress = true;
    var isValidAddressLength = true;
    var isValidContact = true;
    var isValidCompanyShort = true;
    var isValidCompanyLong = true;

    // if(data.sender_firstname === "") {
    //     handleValidationChange("sender_firstname", true, setIsError);
    //     isValidFirstName = false;
    // } else {
    //     handleValidationChange("sender_firstname", false, setIsError);
    //     isValidFirstName = true;
    // }

    // if(data.sender_lastname === "") {
    //     handleValidationChange("sender_lastname", true, setIsError);
    //     isValidLastName = false;
    // } else {
    //     handleValidationChange("sender_lastname", false, setIsError);
    //     isValidLastName = true;
    // }

    if(data.sender_country === "") {
        handleValidationChange("sender_city", true, setIsError);
        isValidCity = false;
    } else {
        handleValidationChange("sender_city", false, setIsError);
        isValidCity = true;
    }

    if(data.sender_city === "") {
        handleValidationChange("sender_city", true, setIsError);
        isValidCity = false;
    } else {
        handleValidationChange("sender_city", false, setIsError);
        isValidCity = true;
    }

    if(data.sender_state_code === "") {
        handleValidationChange("sender_state_code", true, setIsError);
        isValidState = false;
    } else {
        handleValidationChange("sender_state_code", false, setIsError);
        isValidState = true;
    }
    
    if(data.sender_postal === "") {
        handleValidationChange("sender_postal", true, setIsError);
        isValidPostal = false;
    } else {
        handleValidationChange("sender_postal", false, setIsError);
        isValidPostal = true;
    }

    if(data.sender_address1 === "") {
        handleValidationChange("sender_address1", true, setIsError);
        isValidAddress = false;
        handleValidationChange("sender_address_len", false, setIsError);
        isValidAddressLength = true;
    } else {
        handleValidationChange("sender_address1", false, setIsError);
        isValidAddress = true;

        if(data.sender_address1.length < 3) {
            handleValidationChange("sender_address_len", true, setIsError);
            isValidAddressLength = false;
        } else {
            handleValidationChange("sender_address_len", false, setIsError);
            isValidAddressLength = true;
        }
    }

    if(data.sender_contact_no === "") {
        handleValidationChange("sender_contact_no", true, setIsError);
        isValidContact = false;
    } else {
        handleValidationChange("sender_contact_no", false, setIsError);
        isValidContact = true;
    }

    if(data.sender_company !== ""){
        if(data.sender_company.length < 3){
            handleValidationChange("sender_company_short", true, setIsError);
            isValidCompanyShort = false;
        }
        else{
            handleValidationChange("sender_company_short", false, setIsError);
            isValidCompanyShort = true;
        }
        if(data.sender_company.length > 35){
            handleValidationChange("sender_company_long", true, setIsError);
            isValidCompanyLong = false;
        }
        else{
            handleValidationChange("sender_company_long", false, setIsError);
            isValidCompanyLong = true;
        }
    }

    isValid =  isValidFirstName && isValidLastName && isValidCity && isValidState &&
    isValidPostal && isValidAddress && isValidContact && isValidCompanyLong && isValidCompanyShort
    
    return isValid
  
}