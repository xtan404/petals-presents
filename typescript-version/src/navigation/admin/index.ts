// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import ViewDashboardOutline from 'mdi-material-ui/ViewDashboardOutline'
import AlertOutline from 'mdi-material-ui/AlertOutline'
import FileOutline from 'mdi-material-ui/FileOutline'
import FaceAgent from 'mdi-material-ui/FaceAgent'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import Logout from 'mdi-material-ui/Logout'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import PackageVariant from 'mdi-material-ui/PackageVariant'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import Offer from 'mdi-material-ui/Offer'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const AdminNavigation = (): VerticalNavItemsType => {
  return [
   {
      title: 'Dashboard',
      icon: ViewDashboardOutline,
      path: '/admin/dashboard'
    },
    {
      title: 'Orders',
      icon: CurrencyUsd,
      path: '/admin/orders'
    },
    {
      title: 'Products',
      icon: PackageVariant,
      path: '/admin/products'
    },
    {
      title: 'Services',
      icon: Offer,
      path: '/admin/services'
    },
    {
      title: 'Logout',
      icon: Logout,
      path: '/'
    },
    
  ]
}

export default AdminNavigation
