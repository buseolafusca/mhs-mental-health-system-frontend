// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import Notifications from '@material-ui/icons/Notifications'
import Out from "@material-ui/icons/ArrowBack";
import Setting from '@material-ui/icons/Settings'
import TransitEnterexit from '@material-ui/icons/TransitEnterexit'
import account from '@material-ui/icons/AccountCircle'
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.jsx'
import UserProfile from 'views/UserProfile/UserProfile.jsx'
import TableList from 'views/TableList/TableList.jsx'
import TrustList from 'layouts/Trusts/TrustList.jsx'
import trustdetails from 'layouts/Trusts/TrustDetails.jsx'
import TrustAddForm from 'views/Forms/TrustServiceForm'
import TrustManagerForm from 'views/Forms/PersonForm.jsx'
import Typography from 'views/Typography/Typography.jsx'
import NotificationsPage from 'views/Notifications/Notifications.jsx'


const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin'
  },
  {
    // path: '/services',
    path: '/trusts',
    name: 'Trusts',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: TrustList,
    layout: '/admin'
  },
  {
    path: '/profile',
    name: 'Profile',
    rtlName: 'لوحة القيادة',
    icon: account,
    component: UserProfile,
    layout: '/admin'
  },
  {
    path: '/settings',
    name: 'Settings',
    rtlName: 'لوحة القيادة',
    icon: Setting,
    component: Setting,
    layout: '/admin'
  },
  {
    path: '/logout',
    name: 'Logout',
    rtlName: 'لوحة القيادة',
    icon: TransitEnterexit,
    component: DashboardPage,
    layout: '/admin'
  }
]

export default dashboardRoutes
