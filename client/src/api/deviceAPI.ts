import { $authHost, $host } from "."
import { IBrand, IDevice, IType } from "../models/models"

export const deviceAPI = {
  async createType(type: IType) {
    const { data } = await $authHost.post("api/type", type)
    return data
  },

  async getTypes() {
    const { data } = await $host.get("api/type")
    return data
  },

  async createBrand(brand: IBrand) {
    const { data } = await $authHost.post("api/brand", brand)
    return data
  },

  async getBrands() {
    const { data } = await $host.get("api/brand")
    return data
  },

  async createDevice(device: IDevice) {
    const { data } = await $authHost.post("api/device", device)
    return data
  },

  async getDevices() {
    const { data } = await $host.get("api/device")
    return data
  },

  async getOneDevice(id: string) {
    const { data } = await $host.get("api/device/" + id)
    return data
  },
}
