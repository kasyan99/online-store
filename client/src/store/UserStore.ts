import { makeAutoObservable } from "mobx"
import { IUser } from "../models/models"

export default class UserStore {
  private _isAuth: boolean
  private _user: IUser | null
  private _basketDevicesCount: number
  private _basketDevices: number[]

  constructor() {
    this._isAuth = false
    this._user = null
    this._basketDevicesCount = 0
    this._basketDevices = []
    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
  }

  setUser(user: IUser | null) {
    this._user = user
  }

  setBasketDevicesCount(count: number) {
    this._basketDevicesCount = count
  }

  setBasketDevices(devicesId: number[]) {
    this._basketDevices = devicesId
  }

  addBasketDevices(deviceId: number) {
    this._basketDevices = [...this._basketDevices, deviceId]
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }

  get basketDevicesCount() {
    return this._basketDevicesCount
  }

  get basketDevices() {
    return this._basketDevices
  }
}
