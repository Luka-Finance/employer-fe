import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Image } from 'react-bootstrap'
import CustomButton from '../../Components/Common/CustomButton/Index'
import Input from '../../Components/Common/Input/Input'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axiosInstance from '../../Utils/axiosInstance'
import './Styles.css'
import { Link } from 'react-router-dom'
import { saveAccessToken } from '../../Redux/Actions/userActions'
import Spinner from 'react-bootstrap/Spinner'

function SignIn() {
	const dispatch = useDispatch()
	const [form, setForm] = useState({ companyEmail: '', password: '' })
	const [errors, setErrors] = useState({})
	const [passwordA, setPasswordA] = useState(false)
	const [loading, setLoading] = useState(false)
	const [disable, setDisable] = useState(true)

	const onEnterValue = ({ name, value }) => {
		setForm({ ...form, [name]: value })

		if (value !== '') {
			if (name === 'password') {
				if (value.length < 5) {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `Password needs to made up of alpha-numeric characters`,
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'companyEmail') {
				// const regex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
				const regex = new RegExp(/\S+@\S+\.\S+/)
				const isEmailValid = regex.test(value)

				if (value.length < 12 || !isEmailValid) {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `Please enter a valid email address`,
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			}
		} else {
			setErrors((prev) => {
				return { ...prev, [name]: `This field is required` }
			})
		}
	}

	const signIn = async () => {
		setLoading(true)
		try {
			const res = await axiosInstance({
				url: '/business/login',
				method: 'POST',
				data: {
					email: form.companyEmail,
					password: form.password,
				},
			})
			const { data, message } = res.data
			const accessToken = data.token

			dispatch(saveAccessToken(accessToken))

			toast.success(message, {
				position: toast.POSITION.TOP_RIGHT,
			})
			window.location.assign('/dashboard')
			setLoading(false)
			return <ToastContainer />
		} catch (error) {
			setLoading(false)
			// console.log()
			console.log('err ', error)
			const err = error.response.data.message
			toast.error(err, {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		}
	}

	const onSubmit = () => {
		if (!form.companyEmail) {
			setErrors((prev) => {
				return { ...prev, firstName: 'Please add a company email' }
			})
		}

		if (!form.password) {
			setErrors((prev) => {
				return { ...prev, password: 'Please add a password' }
			})
		}

		if (Object.values(form).length === 2) {
			signIn()
		} else {
			toast.warning('Please ensure all fields are filled.', {
				position: toast.POSITION.TOP_RIGHT,
			})
		}
	}

	useEffect(() => {
		if (form.companyEmail.length > 12 && form.password.length > 5) {
			setDisable(false)
		} else {
			setDisable(true)
		}
	}, [form])

	return (
		<div className='parent-cont-2'>
			{/* for toast notification containing */}
			<ToastContainer />

			<div
				className='banner'
				style={{
					position: 'absolute',
				}}
				>
				<Image src='assets/Logo.svg' alt='logo' width={200} />
			</div>

			<div className='body'>
				<div className='form-title'>Sign In</div>

				<div className='form-cont'>
					<div className='input-holder'>
						<Input
							label={'Email'}
							type={'email'}
							onChange={(e) => {
								const value = e.target.value
								onEnterValue({ name: 'companyEmail', value })
							}}
							error={errors.companyEmail}
						/>
					</div>

					<div className='input-holder'>
						<Input
							label={'Password'}
							type={!passwordA ? 'password' : 'text'}
							onChange={(e) => {
								const value = e.target.value
								onEnterValue({ name: 'password', value })
							}}
							error={errors.password}
							icon={
								!passwordA ? (
									<AiOutlineEyeInvisible
										style={{ fontSize: 20, marginRight: 15 }}
									/>
								) : (
									<AiOutlineEye style={{ fontSize: 20, marginRight: 15 }} />
								)
							}
							iconClick={() => setPasswordA(!passwordA)}
						/>
					</div>

					<div className='input-holder'>
						<CustomButton
							title={'Log in'}
							textColor={'#fff'}
							bgColor={'#03A63C'}
							disabledColor={'rgba(3, 166, 60, 0.5)'}
							disabled={disable}
							onClick={onSubmit}
							icon={
								loading && (
									<Spinner
										style={{ marginTop: 5, marginLeft: 15 }}
										animation='border'
										variant='light'
									/>
								)
							}
						/>
					</div>

					<Link style={{ textDecoration: 'none' }} to={'/register'}>
						<p className='otp-aux-link-2'>
							Not registered? Click here to
							<span style={{ marginLeft: 5 }} className='otp-aux-link'>
								Register
							</span>
						</p>
					</Link>

					<Link
						style={{ textDecoration: 'none', marginTop: 5 }}
						to={'/forgot-password'}>
						<p className='otp-aux-link-2'>
							<span style={{ marginLeft: 5 }} className='otp-aux-link'>
								Forgot your password ?
							</span>
						</p>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SignIn
