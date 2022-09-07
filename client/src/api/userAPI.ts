import jwtDecode from "jwt-decode"
import { $authHost, $host } from "."

export const userAPI = {
  async registration(email: string, password: string) {
    const { data } = await $host.post("api/user/registration", {
      email,
      password,
      role: "ADMIN",
    })
    localStorage.setItem("token", data)
    return jwtDecode(data)
  },

  async login(email: string, password: string) {
    const { data } = await $host.post("api/user/login", {
      email,
      password,
    })
    localStorage.setItem("token", data)
    return jwtDecode(data)
  },

  async check() {
    const { data } = await $authHost.get("api/user/auth")

    localStorage.setItem("token", data.token)

    return jwtDecode(data.token)
  },
}
