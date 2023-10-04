import { handleValidationChange } from "./CommonValidation";

export const validateSender = (data, recipient, singleSelectionsSender, singleSelectionsRecipient, setIsError) => {
    var isValid = true;
    var isValidFirstName = true;
    var isValidLastName = true;
    var isValidCountry = true;
    var isValidCity = true;
    var isValidState = true;
    var isValidPostal = true;
    var isValidAddress = true;
    var isValidAddressLength = true;
    var isValidContact = true;
    var isValidCompanyShort = true;
    var isValidCompanyLong = true;

    var isValid = true;
    var isValidRecipientFirstName = true;
    var isValidRecipientLastName = true;
    var isValidRecipientCountry = true;
    var isValidRecipientState = true;
    var isValidRecipientCity = true;
    var isValidRecipientPostal = true;
    var isValidRecipientAddress = true;
    var isValidRecipientAddressLength = true;
    var isValidRecipientContact = true;
    var isValidRecipientCompanyShort = true;
    var isValidRecipientCompanyLong = true;

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

    //SENDER

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

    //RECIPIENT
    if(recipient.recipient_country === "" || singleSelectionsRecipient.length <=0) {
        handleValidationChange("recipient_country", true, setIsError);
        isValidRecipientCountry = false;
    } else {
        handleValidationChange("recipient_country", false, setIsError);
        isValidRecipientCountry = true;
    }

    if(recipient.recipient_state_code === "") {
        handleValidationChange("recipient_state_code", true, setIsError);
        isValidRecipientState = false;
    } else {
        handleValidationChange("recipient_state_code", false, setIsError);
        isValidRecipientState = true;
    }

    if(recipient.recipient_city === "") {
        handleValidationChange("recipient_city", true, setIsError);
        isValidRecipientCity = false;
    } else {
        handleValidationChange("recipient_city", false, setIsError);
        isValidRecipientCity = true;
    }
    
    if(recipient.recipient_postal === "") {      
        handleValidationChange("recipient_postal", true, setIsError);
        isValidRecipientPostal = false;
    } else {
        handleValidationChange("recipient_postal", false, setIsError);
        isValidRecipientPostal = true;
    }

    if(recipient.recipient_address1 === "") {
        handleValidationChange("recipient_address1", true, setIsError);
        isValidRecipientAddress = false;
        handleValidationChange("recipient_address_len", false, setIsError);
        isValidRecipientAddressLength = true;

    } else {
        handleValidationChange("recipient_address1", false, setIsError);
        isValidRecipientAddress = true;
        if(recipient.recipient_address1.length < 3) {
            handleValidationChange("recipient_address_len", true, setIsError);
            isValidRecipientAddressLength = false;
        } else {
            handleValidationChange("recipient_address_len", false, setIsError);
            isValidRecipientAddressLength = true;
        }    
    }

    if(recipient.recipient_contact_no === "") {
        handleValidationChange("recipient_contact_no", true, setIsError);
        isValidRecipientContact = false;
    } else {
        handleValidationChange("recipient_contact_no", false, setIsError);
        isValidRecipientContact = true;
    }

    if(recipient.recipient_company !== ""){
        if(recipient.recipient_company.length < 3){
            handleValidationChange("recipient_company_short", true, setIsError);
            isValidRecipientCompanyShort = false;
        }
        else{
            handleValidationChange("recipient_company_short", false, setIsError);
            isValidRecipientCompanyShort = true;
        }
        if(recipient.recipient_company.length > 35){
            handleValidationChange("recipient_company_long", true, setIsError);
            isValidRecipientCompanyLong = false;
        }
        else{
            handleValidationChange("recipient_company_long", false, setIsError);
            isValidRecipientCompanyLong = true;
        }
    }

    isValid =  isValidFirstName && isValidLastName &&  isValidCountry && isValidCity && isValidState &&
    isValidPostal && isValidAddress && isValidContact && isValidCompanyLong && isValidCompanyShort && 
    //RECIPIENT
    isValidRecipientFirstName &&
    isValidRecipientLastName &&
    isValidRecipientCountry &&
    isValidRecipientPostal &&
    isValidRecipientState &&
    isValidRecipientCity &&
    isValidRecipientAddress &&
    isValidRecipientContact &&
    isValidRecipientCompanyLong &&
    isValidRecipientCompanyShort
    

    
    return isValid
  
}