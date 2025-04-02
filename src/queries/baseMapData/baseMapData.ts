import { axiosClient } from '../axiosClient'

export async function fetchBaseMapData() {
  // console.info('Fetching base map data...');
  const baseMapData = await axiosClient.get('/rooms')
  return baseMapData
}
