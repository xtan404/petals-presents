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
      path: '/admin/orders'
    },
    {
      title: 'Alert Management',
      icon: AlertOutline,
      path: '/admin/geo/alerts'
    },
    {
      title: 'Reports',
      icon: FileOutline,
      path: '/admin/geo/reports'
    },
    {
      title: 'Help and Support',
      icon: FaceAgent,
      path: '/admin/geo/support'
    },
    {
      title: 'Logout',
      icon: Logout,
      path: '/admin/services'
    },
    
  ]
}

export default AdminNavigation
