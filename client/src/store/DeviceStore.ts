import { makeAutoObservable } from "mobx"
import { IBrand, IDevice, IType } from "../models/models"

export default class DeviceStore {
  private _types: IType[]
  private _brands: IBrand[]
  private _devices: IDevice[]
  private _selectedType: IType | null
  private _selectedBrand: IBrand | null

  constructor() {
    this._types = []

    this._brands = []

    this._devices = []

    this._selectedType = null
    this._selectedBrand = null

    makeAutoObservable(this)
  }

  setTypes(types: IType[]) {
    this._types = types
  }

  setBrands(brands: IBrand[]) {
    this._brands = brands
  }

  setSelectedType(type: IType | null) {
    this._selectedType = type
  }

  setSelectedBrands(brand: IBrand | null) {
    this._selectedBrand = brand
  }

  setDevices(devices: IDevice[]) {
    this._devices = devices
  }

  get types() {
    return this._types
  }

  get brands() {
    return this._brands
  }

  get selectedType() {
    return this._selectedType
  }

  get selectedBrand() {
    return this._selectedBrand
  }
  get devices() {
    return this._devices
  }
}
