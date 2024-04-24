import api from "../../../services/axiosInstance/api";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all properties
export const getProperties = (params) => {
  const { pageNo, limit, sortBy,
    sortDirection,
    name,
    address,
    street,
    unitsCount,
    district,
    instrumentNumber,
    city,
    blockNumber,
    postalCode } = params;
  return api.get(`${apiUrl}dashboard/properties?page=${pageNo}&limit=${limit}${sortBy?`&sortBy=${sortBy}`:``}${sortDirection?`&sortDirection=${sortDirection}`:``}${name?`&name=${name}`:``}${address?`&address=${address}`:``}${street?`&street=${street}`:``}${postalCode?`&postalCode=${postalCode}`:``}${instrumentNumber?`&instrumentNumber=${instrumentNumber}`:``}${unitsCount?`&unitsCount=${unitsCount}`:``}${blockNumber?`&blockNumber=${blockNumber}`:``}${district?`&district=${district}`:``}${city?`&city=${city}`:``}`, {
  }).then(res => res.data.data)
}

//Fech details of a specific Propertey
export const getProperteyDetails = async (id) => {
  try {
    let url = `${apiUrl}dashboard/properties/${id}`;
    const response = await api.get(url);

    if (response.status === 200) {
      const data = response.data.data;
      return data;
    } else {
      return { error: 'Failed to fetch data' };
    }
  } catch (error) {
    return { error: 'Network error occurred' };
  }
}

//update Propertey
export const updatePropertey = (data) => {
  return api.put(`${apiUrl}dashboard/properties/${data?.id}`, data?.body)
}

//create Propertey
export const createPropertey = (data) => {
  return api.post(`${apiUrl}dashboard/properties`, data?.body)
}

//delete Propertey
export const deletePropertey = (data) => {
  return api.delete(`${apiUrl}dashboard/properties/${data?.id}`)
}


