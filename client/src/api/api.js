import axios from 'axios';

const instance = axios.create({ baseURL: '/api/v1/' });

export const getHouses = () => instance.get('/houses').then(({ data }) => data);
export const getEntrances = async (houseId) => {
  const search = new URLSearchParams({ houseId });
  const { data } = await instance.get(`/entrances/?${search}`);
  return data;
};
export const getFloors = async (entranceId) => {
  const search = new URLSearchParams({ entranceId });
  const { data } = await instance.get(`/floors/?${search}`);
  return data;
};
