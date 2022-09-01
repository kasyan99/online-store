import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes, RoutType } from '../routes'
import { SHOP_ROUTE } from '../utils/consts'

const AppRoutes = (routes: RoutType[]) => (
   routes.map(({ path, Component }) => (
      <Route path={path} element={<Component />} key={path} />
   ))
)


const AppRouter: React.FC = () => {
   const isAuth = true
   return (
      <Routes>
         {isAuth && AppRoutes(authRoutes)}
         {AppRoutes(publicRoutes)}
         <Route
            path='/*'
            element={<Navigate to={SHOP_ROUTE} />}
         />
      </Routes>
   )
}

export default AppRouter