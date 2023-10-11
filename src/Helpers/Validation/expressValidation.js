import {
  handleExpressPackageValidationChange,
  handleValidationChange,
} from "./CommonValidation"

export const validatePrimaryDetails = (
  data,
  pickup,
  selectedOutlet,
  setIsError
) => {
  var isValid = true

  if (pickup === true) {
    if (selectedOutlet.length === 0) {
      handleValidationChange("pickup_outlet", true, setIsError)
      isValid = isValid && false
    } else {
      handleValidationChange("pickup_outlet", false, setIsError)
      isValid = isValid && true
    }
  } else {
    handleValidationChange("pickup_outlet", false, setIsError)
    isValid = isValid && true
  }

  if (data.destination_system === "") {
    handleValidationChange("destination_system", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("destination_system", false, setIsError)
    isValid = isValid && true
  }
  if (data.transaction_type === "") {
    handleValidationChange("transaction_type", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("transaction_type", false, setIsError)
    isValid = isValid && true
  }
  if (data.service_type === "" || data.service_type === "Select") {
    handleValidationChange("service_type", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("service_type", false, setIsError)
    isValid = isValid && true
  }

  //Account Details
  if (data.account_number !== "WALK-IN" && data.payment_term === "credit") {
    if (data.account_number === "") {
      handleValidationChange("account_number", true, setIsError)
      isValid = isValid && false
    } else {
      handleValidationChange("account_number", false, setIsError)
      isValid = isValid && true
    }
    if (data.account_name === "") {
      handleValidationChange("account_name", true, setIsError)
      isValid = isValid && false
    } else {
      handleValidationChange("account_name", false, setIsError)
      isValid = isValid && true
    }
  } else {
    handleValidationChange("account_number", false, setIsError)
    handleValidationChange("account_name", false, setIsError)
    isValid = isValid && true
  }

  if (
    data.payor === "" &&
    (data.payment_term === "credit" || data.account_name === "WALK-IN")
  ) {
    handleValidationChange("payor", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("payor", false, setIsError)
    isValid = isValid && true
  }

  // if (data.shipper_company !== "") {
  //   // if (data.reference === "") {
  //   //   handleValidationChange("reference", true, setIsError);
  //   //   isValid = isValid && false;
  //   // } else {
  //   //   handleValidationChange("reference", false, setIsError);
  //   //   isValid = isValid && true;
  //   // }
  //   if (data.express_attachments.length < 1) {
  //     handleValidationChange("express_attachments", true, setIsError);
  //     isValid = isValid && false;
  //   } else {
  //     handleValidationChange("express_attachments", false, setIsError);
  //     isValid = isValid && true;
  //   }
  // } else {
  //   handleValidationChange("reference", false, setIsError);
  //   isValid = isValid && true;
  // }

  //Shipper
  if (data.shipper_name === "") {
    handleValidationChange("shipper_name", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("shipper_name", false, setIsError)
    isValid = isValid && true
  }
  if (data.shipper_province === "") {
    handleValidationChange("shipper_province", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("shipper_province", false, setIsError)
    isValid = isValid && true
  }
  if (data.shipper_city === "") {
    handleValidationChange("shipper_city", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("shipper_city", false, setIsError)
    isValid = isValid && true
  }
  if (data.shipper_brgy === "") {
    handleValidationChange("shipper_brgy", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("shipper_brgy", false, setIsError)
    isValid = isValid && true
  }
  if (data.shipper_postal === "") {
    handleValidationChange("shipper_postal", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("shipper_postal", false, setIsError)
    isValid = isValid && true
  }
  if (data.shipper_address === "") {
    handleValidationChange("shipper_address", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("shipper_address", false, setIsError)
    isValid = isValid && true
  }
  if (data.shipper_contact === "") {
    handleValidationChange("shipper_contact", true, setIsError)
    isValid = isValid && false
    handleValidationChange("shipper_contact_error", false, setIsError)
    isValid = isValid && true
  } else {
    handleValidationChange("shipper_contact", false, setIsError)
    isValid = isValid && true
    if (
      data.shipper_contact[0] === "0" &&
      (data.shipper_contact.length === 11 || data.shipper_contact.length === 10)
    ) {
      handleValidationChange("shipper_contact_error", false, setIsError)
      isValid = isValid && true
    } else {
      handleValidationChange("shipper_contact_error", true, setIsError)
      isValid = isValid && false
    }
  }
  //Consignee
  if (data.consignee_name === "") {
    handleValidationChange("consignee_name", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("consignee_name", false, setIsError)
    isValid = isValid && true
  }
  if (data.consignee_province === "") {
    handleValidationChange("consignee_province", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("consignee_province", false, setIsError)
    isValid = isValid && true
  }
  if (data.consignee_city === "") {
    handleValidationChange("consignee_city", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("consignee_city", false, setIsError)
    isValid = isValid && true
  }
  if (data.consignee_brgy === "") {
    handleValidationChange("consignee_brgy", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("consignee_brgy", false, setIsError)
    isValid = isValid && true
  }
  if (data.consignee_postal === "") {
    handleValidationChange("consignee_postal", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("consignee_postal", false, setIsError)
    isValid = isValid && true
  }
  if (data.consignee_address === "") {
    handleValidationChange("consignee_address", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("consignee_address", false, setIsError)
    isValid = isValid && true
  }
  if (data.consignee_contact === "") {
    handleValidationChange("consignee_contact", true, setIsError)
    isValid = isValid && false
    handleValidationChange("consignee_contact_error", false, setIsError)
    isValid = isValid && true
  } else {
    handleValidationChange("consignee_contact", false, setIsError)
    isValid = isValid && true
    if (
      data.consignee_contact[0] === "0" &&
      (data.consignee_contact.length === 11 ||
        data.consignee_contact.length === 10)
    ) {
      handleValidationChange("consignee_contact_error", false, setIsError)
      isValid = isValid && true
    } else {
      handleValidationChange("consignee_contact_error", true, setIsError)
      isValid = isValid && false
    }
  }
  if (data.consignee_origin === "") {
    handleValidationChange("consignee_origin", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("consignee_origin", false, setIsError)
    isValid = isValid && true
  }
  if (data.consignee_area_code === "") {
    handleValidationChange("consignee_area_code", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("consignee_area_code", false, setIsError)
    isValid = isValid && true
  }

  return isValid
}

export const validatePackage = (
  generalDetails,
  documentDetails,
  setIsError,
  setIsErrorPackage,
  isErrorPackage
) => {
  var isValid = true

  if (
    generalDetails.rate_classification === "" ||
    generalDetails.rate_classification === "Select"
  ) {
    handleValidationChange("rate_classification", true, setIsError)
    isValid = isValid && false
  } else {
    handleValidationChange("rate_classification", false, setIsError)
    isValid = isValid && true
  }

  if (generalDetails.transaction_type !== "document") {
    if (
      generalDetails.declared_value === "" ||
      generalDetails.declared_value === "0" ||
      parseInt(generalDetails.declared_value) === 0
    ) {
      handleValidationChange("declared_value", true, setIsError)
      isValid = isValid && false
    } else {
      handleValidationChange("declared_value", false, setIsError)
      isValid = isValid && true
    }
  } else {
    handleValidationChange("declared_value", false, setIsError)
    isValid = isValid && true
  }

  if (generalDetails.account_cod_flag === "1") {
    if (generalDetails.cod_amount === "") {
      handleValidationChange("cod_amount", true, setIsError)
      isValid = isValid && false
    } else {
      handleValidationChange("cod_amount", false, setIsError)
      isValid = isValid && true
    }
  } else {
    handleValidationChange("cod_amount", false, setIsError)
    isValid = isValid && true
  }
  //Cargo and Parcel Validations
  if (
    generalDetails.transaction_type === "cargo" ||
    generalDetails.transaction_type === "parcel"
  ) {
    if (generalDetails.packaging === "") {
      handleValidationChange("packaging", true, setIsError)
      isValid = isValid && false
    } else {
      handleValidationChange("packaging", false, setIsError)
      isValid = isValid && true
    }
  }

  //Package Details
  documentDetails.map((data, key) => {
    if (
      data.package_code === "" ||
      data.package_code === " " ||
      data.package_code === "Select"
    ) {
      handleExpressPackageValidationChange(
        `${key}@` + "package_code",
        true,

        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && false
    } else {
      handleExpressPackageValidationChange(
        `${key}@` + "package_code",
        false,
        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && true
    }
    if (data.commodity_code.length < 1) {
      handleExpressPackageValidationChange(
        `${key}@` + "commodity_code",
        true,
        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && false
    } else {
      handleExpressPackageValidationChange(
        `${key}@` + "commodity_code",
        false,
        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && true
    }
    if (data.description === "" || data.description === "Select") {
      handleExpressPackageValidationChange(
        `${key}@` + "description",
        true,
        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && false
    } else {
      handleExpressPackageValidationChange(
        `${key}@` + "description",
        false,
        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && true
    }

    if (
      (typeof data.length === "string" && data.length === "") ||
      (typeof data.length === "number" && parseFloat(data.length) < 1)
    ) {
      handleExpressPackageValidationChange(
        `${key}@` + "length",
        true,

        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && false
    } else {
      handleExpressPackageValidationChange(
        `${key}@` + "length",
        false,

        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && true
    }
    if (
      (typeof data.width === "string" && data.width === "") ||
      (typeof data.width === "number" && parseFloat(data.width) < 1)
    ) {
      handleExpressPackageValidationChange(
        `${key}@` + "width",
        true,

        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && false
    } else {
      handleExpressPackageValidationChange(
        `${key}@` + "width",
        false,

        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && true
    }
    if (
      (typeof data.height === "string" && data.height === "") ||
      (typeof data.height === "number" && parseFloat(data.height) < 1)
    ) {
      handleExpressPackageValidationChange(
        `${key}@` + "height",
        true,

        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && false
    } else {
      handleExpressPackageValidationChange(
        `${key}@` + "height",
        false,

        setIsErrorPackage,
        isErrorPackage
      )
      isValid = isValid && true
    }

    if (
      generalDetails.transaction_type === "parcel" ||
      generalDetails.transaction_type === "cargo"
    ) {
      if (data.actual_weight === "" || parseFloat(data.actual_weight) < 0.1) {
        handleExpressPackageValidationChange(
          `${key}@` + "actual_weight",
          true,
          setIsErrorPackage,
          isErrorPackage
        )
        isValid = isValid && false
      } else {
        handleExpressPackageValidationChange(
          `${key}@` + "actual_weight",
          false,

          setIsErrorPackage,
          isErrorPackage
        )
        isValid = isValid && true
      }
      // if (data.block_measurement === "1") {
      //   if (data.actual_weight === "") {
      //     handleExpressPackageValidationChange(
      //       `${key}@` + "actual_weight",
      //       true,
      //       setIsErrorPackage,
      //       isErrorPackage
      //     );
      //     isValid = isValid && false;
      //   } else {
      //     handleExpressPackageValidationChange(
      //       `${key}@` + "actual_weight",
      //       false,

      //       setIsErrorPackage,
      //       isErrorPackage
      //     );
      //     isValid = isValid && true;
      //   }
      // } else {
      //   handleExpressPackageValidationChange(
      //     `${key}@` + "actual_weight",
      //     false,
      //     setIsErrorPackage,
      //     isErrorPackage
      //   );
      // }

      if (data.quantity === "" || parseInt(data.quantity) < 1) {
        handleExpressPackageValidationChange(
          `${key}@` + "quantity",
          true,
          setIsErrorPackage,
          isErrorPackage
        )
        isValid = isValid && false
      } else {
        handleExpressPackageValidationChange(
          `${key}@` + "quantity",
          false,
          setIsErrorPackage,
          isErrorPackage
        )
        isValid = isValid && true
      }
    }
  })

  return isValid
}
