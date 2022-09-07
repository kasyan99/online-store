import { makeAutoObservable } from "mobx"
import { IUser } from "../models/models"

export default class UserStore {
  private _isAuth: boolean
  private _user: IUser | {} | unknown

  constructor() {
    this._isAuth = false
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
  }

  setUser(user: IUser | {} | unknown) {
    this._user = user
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }
}
