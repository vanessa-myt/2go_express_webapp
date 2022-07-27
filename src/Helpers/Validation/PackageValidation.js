import { handleValidationChange } from "./CommonValidation";

export const validatePackage = (upperDetails, documentCustoms, documentDesc, documentType, documentWeight, maxWeight, data, setIsError) => {
    var isValid = true;
    var isValidPackage = true;

    //documents
    var isValidType = true
    var isValidDesc = true
    var isValidCustoms = true
    var isValidWeight = true
    var isValidCompareWeight = true

    //item
    var isValidItem = true

    if(upperDetails.packaging_type === "") {  
        handleValidationChange("packaging_type", true, setIsError);
        isValidPackage = false;
    } else {
        handleValidationChange("packaging_type", false, setIsError);
        isValidPackage = true;
    }

    if(documentCustoms === "") {
        handleValidationChange("documentCustoms", true, setIsError);
        isValidCustoms = false;
    } else {
        handleValidationChange("documentCustoms", false, setIsError);
        isValidCustoms = true;
    }

    if(documentDesc === "") {
        handleValidationChange("documentDesc", true, setIsError);
        isValidDesc = false;
    } else {
        handleValidationChange("documentDesc", false, setIsError);
        isValidDesc = true;
    }

    if(documentType === "" || documentType === "Select") {
        handleValidationChange("documentType", true, setIsError);
        isValidType = false;
    } else {
        handleValidationChange("documentType", false, setIsError);
        isValidType = true;
    }  

    if(documentType === "" || documentType === "Select") {
        handleValidationChange("documentType", true, setIsError);
        isValidType = false;
    } else {
        handleValidationChange("documentType", false, setIsError);
        isValidType = true;
    }  

    if((documentWeight === "" || documentWeight === "0") && upperDetails.packaging_type === "11") {
        handleValidationChange("documentWeight", true, setIsError);
        isValidWeight = false;
    } else {
        handleValidationChange("documentWeight", false, setIsError);
        isValidWeight = true;
    }  

    if(parseFloat(documentWeight) > parseFloat(maxWeight)){
        handleValidationChange("compareWeight", true, setIsError);
        isValidCompareWeight = false;     
    }
    else{
        handleValidationChange("compareWeight", false, setIsError);
        isValidCompareWeight = true;  
    }

    if(data.length <= 0) {
        handleValidationChange("data", true, setIsError);
        isValidItem = false;
    } else {
        handleValidationChange("data", false, setIsError);
        isValidItem = true;
    }

    if(upperDetails.detail_type === "item"){
        isValid = isValidPackage && isValidItem
    }

    if(upperDetails.detail_type === "document"){
        isValid = isValidPackage && isValidType && isValidDesc && isValidCustoms && isValidWeight && isValidCompareWeight
    }

    return isValid
}

export const validateItemDetails = (item, setIsItemError) => {
    var isValid = true;
    var isValidDesc = true;
    var isValidMade = true;
    var isValidQty = true;
    var isValidWeight = true;
    var isValidCustoms = true;

    if(item.description === "" || item.description === undefined) {  
        handleValidationChange("description", true, setIsItemError);
        isValidDesc = false;
    } else {
        handleValidationChange("description", false, setIsItemError);
        isValidDesc = true;
    }

    if(item.made_in === "" || item.made_in === undefined || item.made_in === "Select" ) {  
        handleValidationChange("made_in", true, setIsItemError);
        isValidMade = false;
    } else {
        handleValidationChange("made_in", false, setIsItemError);
        isValidMade = true;
    }

    if(item.qty === "" || item.qty === undefined) {  
        handleValidationChange("qty", true, setIsItemError);
        isValidQty = false;
    } else {
        handleValidationChange("qty", false, setIsItemError);
        isValidQty = true;
    }

    if(item.weight === "" || item.weight === undefined) {  
        handleValidationChange("weight", true, setIsItemError);
        isValidWeight = false;
    } else {
        handleValidationChange("weight", false, setIsItemError);
        isValidWeight = true;
    }

    if(item.customs_value === "" || item.customs_value === undefined) {  
        handleValidationChange("customs_value", true, setIsItemError);
        isValidCustoms = false;
    } else {
        handleValidationChange("customs_value", false, setIsItemError);
        isValidCustoms = true;
    }

    isValid = isValidDesc &&
    isValidMade &&
    isValidQty &&
    isValidWeight &&
    isValidCustoms

    return isValid;
}