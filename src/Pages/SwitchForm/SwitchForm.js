import React, { useState } from "react";
import { useStep } from "react-hooks-helper";
import InternationalForm from "../International/InternationalForm";
import Confirmation from "../Confirmation/Confirmation";
import { formatDate, formatDateNoTime, getTodayDate } from "../../Helpers/Utils/Common";

function SwitchForm() {

    const date = formatDateNoTime(getTodayDate());
    // formatDateNoTime(date);

const senderDetails = {
    sender_firstname: "",
    sender_lastname: "",
    sender_middlename: "",
    sender_suffix:"",
    sender_country: "",
    sender_state_code: "",
    sender_city:"",
    sender_postal:"",
    sender_email:"",
    sender_contact_no:"",
    sender_company:"",
    sender_address1:"",
    sender_address2:"",
    sender_address3:"",
    sender_is_new: "0",
}


const recipientDetails = {
    recipient_firstname: "",
    recipient_lastname: "",
    recipient_middlename: "",
    recipient_suffix:"",
    recipient_country: "",
    recipient_state_code: "",
    recipient_city:"",
    recipient_postal:"",
    recipient_email:"",
    recipient_contact_no:"",
    recipient_company:"",
    recipient_address1:"",
    recipient_address2:"",
    recipient_address3:"",
    recipient_is_new: "0",
    recipient_is_residential:"0",
    ship_date: date,
}

const steps = [
    // {id: "sender"},
    // {id: "recipient"},
    // {id: "packages"},
    // {id: "summary"},
    // {id: "payment"},
    {id: "international"},
    {id: "summary"},
]

    //sender
    const [sender, setSender] = useState(senderDetails);
    const [hasResult, setHasResult] = useState(false);
    const [result, setResult] = useState([]);
    const [searchingSender, setSearchingSender] = useState(false)
    const [provinceSelections, setProvinceSelections] = useState([]);
    const [citySelections, setCitySelections] = useState([]);

    //recipient
    const [recipient, setRecipient] = useState(recipientDetails);
    const [postalAware, setPostalAware] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchingRecipient, setSearchingRecipient] = useState(false);
    const [singleSelections, setSingleSelections] = useState([]);
    const [singleSelectionsSender, setSingleSelectionsSender] = useState([]);
    const [singleSelectionsRecipient, setSingleSelectionsRecipient] = useState([]);
    const [stateSelections, setStateSelections] = useState([]);
    const [citiesSelections, setCitiesSelections] = useState([]);

    //package
    const [loadingPackage, setLoadingPackage] = useState(false);
    const [isItem, setIsItem] = useState(true);
    const [isDocument, setIsDocument] = useState(false);
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);
    const [packageDetails, setPackageDetails] = useState({
        total_package_content_1:"",
        total_customs_value_1: 0,
        weight_1: 0,
        length: 0,
        width: 0,
        height: 0,
    });
    const [sendDetails, setSendDetails] = useState({});
    const [item, setItem] = useState({
        id: index,
        description: "",
        hs_code:"",
        made_in:"",
        qty:"",
        unit:"PCS",
        weight:"",
        customs_value:"",
        new_item_profile:"0",
    });
    const [upperDetails, setUpperDetails] = useState({
        packaging_type:"",
        service_type:"FEDEX_INTERNATIONAL_PRIORITY",
        detail_type:"item",
        customs_invoice:"pro_forma_invoice",
        higher_limit_liability:"0",
        signature_required:"0",
        // close_time: "17:30", 
        purpose:"Commercial",
        total_packages:"1", 
        total_weight: 0, 
    });
    const [maxWeight, setMaxWeight] = useState("0");
    const [maxLength, setMaxLength] = useState("");
    const [maxWidth, setMaxWidth] = useState("");
    const [maxHeight, setMaxHeight] = useState("");
    const [documentCustoms, setDocumentCustoms] = useState("");
    const [documentDesc, setDocumentDesc] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [searchingItem, setSearchingItem] = useState(false)
    const [generalDetails, setGeneralDetails] = useState({})
    const [transactionDetails, setTransactionDetails] = useState({})
    const [countrySelections, setCountrySelections] = useState([])
    const [dial_code, setDialcode] = useState('+') 
    const [addActualWeight, setAddActualWeight] = useState(false);
    const [documentWeight, setDocumentWeight] = useState("0")
    const [itemTotals, setItemTotals] = useState({
        totalQty:"",
        totalWeight:"",
        totalCustoms:"",
    })

    //payment
    const [type, setType] = useState("")

    const { step, navigation } = useStep({
      steps,
      initialStep: 0,
    });

    const senderProps = {sender, setSender, hasResult, setHasResult, result, setResult, searchingSender, setSearchingSender, provinceSelections, setProvinceSelections, citySelections, setCitySelections, navigation};
    const recipientProps = { recipient, setRecipient, postalAware, setPostalAware, loading, setLoading, searchingRecipient, setSearchingRecipient, singleSelections, setSingleSelections, stateSelections, setStateSelections, citiesSelections, setCitiesSelections, dial_code, setDialcode, navigation };
    const packageProps = {sender, recipient, index, item, setItem, setIndex, packageDetails, setPackageDetails, sendDetails, setSendDetails, upperDetails, setUpperDetails, data, setData, 
        maxWeight, maxLength, setMaxLength, setMaxWeight, maxWidth, setMaxWidth, maxHeight, setMaxHeight, documentCustoms, setDocumentCustoms, 
        documentDesc, setDocumentDesc, documentType, setDocumentType, documentWeight, setDocumentWeight, isItem, setIsItem, isDocument, setIsDocument, loadingPackage, setLoadingPackage, searchingItem, setSearchingItem, 
        setTransactionDetails, setGeneralDetails, setType, countrySelections, setCountrySelections, addActualWeight, setAddActualWeight, itemTotals, setItemTotals, navigation}
    const paymentProps = {type, generalDetails, transactionDetails, navigation}


    const internationalProps = {sender, setSender, hasResult, setHasResult, result, setResult, searchingSender, setSearchingSender, provinceSelections, 
                                setProvinceSelections, navigation, recipient, setRecipient, postalAware, setPostalAware, 
                                loading, setLoading, searchingRecipient, setSearchingRecipient, singleSelections, setSingleSelections, stateSelections, 
                                setStateSelections, dial_code, setDialcode, index, item, setItem, setIndex, packageDetails, setPackageDetails, sendDetails, 
                                setSendDetails, upperDetails, setUpperDetails, data, setData, maxWeight, maxLength, setMaxLength, setMaxWeight, maxWidth, setMaxWidth, 
                                maxHeight, setMaxHeight, documentCustoms, setDocumentCustoms, documentDesc, setDocumentDesc, documentType, setDocumentType, 
                                documentWeight, setDocumentWeight, isItem, setIsItem, isDocument, setIsDocument, loadingPackage, setLoadingPackage, searchingItem, 
                                setSearchingItem, setTransactionDetails, setGeneralDetails, setType, countrySelections, setCountrySelections, addActualWeight, 
                                setAddActualWeight, itemTotals, setItemTotals, type, generalDetails, transactionDetails, upperDetails, packageDetails, singleSelectionsSender, 
                                setSingleSelectionsSender, singleSelectionsRecipient, setSingleSelectionsRecipient}

    const summaryProps = {sender, recipient, upperDetails, packageDetails, transactionDetails, isItem, setIsItem, isDocument, setIsDocument, navigation }

    switch (step.id) {
        // case "sender":
        //     return <Sender { ...senderProps }/>   
        // case "recipient":
        //     return <Recipient { ...recipientProps}/> 
        // case "packages":
        //     return <Package { ...packageProps }/>
        // case "summary":
        //     return <Summary {...summaryProps}/>
        // case "payment":
        //     return <Payment {...paymentProps}/>
        case "international":
            return <InternationalForm {...internationalProps}/>
        case "summary":
            return <Confirmation {...summaryProps}/>
        
    }


    return (
        <div>
        </div>
    )

}

export default SwitchForm
