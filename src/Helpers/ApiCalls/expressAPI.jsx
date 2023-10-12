import { postAPICall } from "./axiosMethodCalls"

export const searchAreasDef = async () => {
  try {
    const response = await postAPICall(
      process.env.REACT_APP_LINK + "express_service_areas/get_distinct",
      {
        province: "",
        city: "",
        barangay: "",
      }
    )

    return { data: response.data.data }
  } catch (error) {
    return { error: error.response }
  }
}

export const searchAreas = async (details, type) => {
  try {
    const response = await postAPICall(
      process.env.REACT_APP_LINK + "express_service_areas/get_distinct",
      {
        province:
          type === "shipper"
            ? details.shipper_province
            : details.consignee_province,
        city:
          type === "shipper" ? details.shipper_city : details.consignee_city,
        barangay:
          type === "shipper" ? details.shipper_brgy : details.consignee_brgy,
        postal: "",
      }
    )

    return { data: response.data.data }
  } catch (error) {
    return { error: error.response }
  }
}

export const searchPackageCodes = async (details) => {
  try {
    var destination_system
    if (details.destination_system === "ZIP-S") {
      destination_system = "ZIPSS"
    }
    if (details.destination_system === "ZIP-R") {
      destination_system = "ZIP"
    }
    if (details.destination_system === "QAIR") {
      destination_system = "QAIR"
    }

    const response = await postAPICall(
      process.env.REACT_APP_LINK + "express_package_codes/search",
      {
        shipment_mode: destination_system,
        packaging: details.packaging,
        transaction_type: details.transaction_type,
      }
    )

    return { data: response.data.data }
  } catch (error) {
    return { error: error.response }
  }
}

export const createExpress = async (
  data,
  package_details,
  package_codes,
  expressType,
  selectedOutlet
) => {
  try {
    var paymode = ""
    if (data.account_number === "WALK-IN") {
      // data.is_walk_in = "1";
      if (data.payor === "shipper") {
        paymode = "cash"
      }
      if (data.payor === "consignee") {
        paymode = "freight-collect"
      }
    } else {
      if (data.payment_term === "credit") {
        if (data.payor === "shipper") {
          paymode = "collect-shipper"
        }
        if (data.payor === "consignee") {
          paymode = "collect-consignee"
        }
      } else {
        paymode = "cash"
      }
      // data.is_walk_in = "0";
    }
    var pkg_details = []
    var stickers = []
    package_details?.map((val) => {
      val.port_sticker_numbers.map((sticker) => {
        stickers.push(sticker.serial)
      })
      pkg_details.push({
        ...val,
        package_code: package_codes[parseInt(val.package_code)]["id"],
        port_sticker_numbers: stickers,
        commodity_code: val.commodity_code[0].code,
      })

      // val.package_code = package_codes[parseInt(val.package_code)]["code"];
    })

    const response = await postAPICall(
      process.env.REACT_APP_LINK + "public_express_transactions/add",
      {
        ...data,
        destination_system:
          data.destination_system === "ZIP-R" ||
          data.destination_system === "ZIP-S"
            ? "ZIP"
            : data.destination_system,
        shipment_mode: data.destination_system,
        paymode: paymode,
        is_walk_in: "1",
        package_details: [...pkg_details],
        is_dropoff: "0",
        save_shipper: data.save_shipper === true ? "1" : "0",
        save_consignee: data.save_consignee === true ? "1" : "0",
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
