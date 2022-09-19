import { useContext } from "react"
import { Context } from ".."
import { userAPI } from "../api/userAPI"

const useRemoveDevice = () => {
  const { user } = useContext(Context)

  const remove = (deviceId: number) => {
    if (user.user) {
      userAPI.removeDeviceFromBasket(user.user.id, deviceId)
      user.setBasketDevicesCount(user.basketDevicesCount - 1)
    }
  }

  return remove
}

export default useRemoveDevice
