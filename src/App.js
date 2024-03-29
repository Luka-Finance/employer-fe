import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './Pages/AuthPages/Register'
import SuccessReg from './Pages/AuthPages/SuccessReg'
import OtpPage from './Pages/AuthPages/OtpPage'
import SignIn from './Pages/AuthPages/SignIn'
import ForgotPassword from './Pages/AuthPages/ForgotPassword'
import SetNewPassword from './Pages/AuthPages/SetNewPassword'
import UtilPage from './Pages/AuthPages/UtilPage/UtilPage'
import LandingPage from './Pages/AuthPages/LandingPage'

import Accounts from './Pages/UserPages/Accounts/Accounts'
import Payments from './Pages/UserPages/Payments/Payments'
import Settings from './Pages/UserPages/Settings/Settings'
import Dashboard from './Pages/UserPages/Dashboard/Dashboard'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/util-page' element={<UtilPage />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/payments' element={<Payments />} />
				<Route path='/employees' element={<Accounts />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/reset-password/:id' element={<SetNewPassword />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/sign-in' exact element={<SignIn />} />
				<Route path='/otp-entry' element={<OtpPage />} />
				<Route path='/success-registration' element={<SuccessReg />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<LandingPage />} />
			</Routes>
		</Router>
	)
}

export default App
