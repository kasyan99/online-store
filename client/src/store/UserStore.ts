import { makeAutoObservable } from "mobx"
import { IUser } from "../models/models"

export default class UserStore {
  private _isAuth: boolean
  private _user: IUser | null

  constructor() {
    this._isAuth = false
    this._user = null
    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
  }

  setUser(user: IUser | null) {
    this._user = user
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }
}
