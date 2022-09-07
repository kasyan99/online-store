export interface IUser {
  email: string
  exp: number
  iat: number
  id: number
  role: string
}

export interface IType {
  id: number
  name: string
}

export interface IBrand {
  id: number
  name: string
}

export interface IDevice {
  id: number
  name: string
  price: number
  rating: number
  img: string
}
