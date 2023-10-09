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
