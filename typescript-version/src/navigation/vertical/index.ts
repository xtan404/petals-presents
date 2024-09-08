// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import ChartLine from 'mdi-material-ui/ChartLine'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import Logout from 'mdi-material-ui/Logout'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import ShoppingOutline from 'mdi-material-ui/ShoppingOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { Home } from 'mdi-material-ui'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      icon: Home,
      path: '/pages/home'
    },
    {
      title: 'Shop',
      icon: ShoppingOutline,
      path: '/pages/shop'
    },
    {
      title: 'Profile',
      icon: AccountOutline,
      path: '/account-settings'
    }
  ]
}

export default navigation
