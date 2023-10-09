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
