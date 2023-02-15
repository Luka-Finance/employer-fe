import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image'
import Input from '../../Components/Common/Input/Input'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import CustomButton from '../../Components/Common/CustomButton/Index'
import CustomSelector from '../../Components/Common/CustomSelector/CustomSelector'
import axiosInstance from '../../Utils/axiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import accessLocalStorage from '../../Utils/accessLocalStorage'
import './Styles.css'
import countries from '@odusanya/african-countries'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Spinner from 'react-bootstrap/Spinner'
import { StateNig } from '../../Components/List/StateNig'

function Register() {
	const [form, setForm] = useState({
		companyCountry: 'Nigeria',
	})
	const [errors, setErrors] = useState({})
	const [passwordA, setPasswordA] = useState(false)
	const [passwordB, setPasswordB] = useState(false)
	const [phone, setPhone] = useState('')
	const [loading, setLoading] = useState(false)
	const [loadingText, setLoadingText] = useState('')
	const [countryList, setCountryList] = useState([
		'Nigeria',
		'Ghana',
		'Togo',
		'Cameroon',
	])
	const [terms, setTerms] = useState(false)

	const onEnterValue = ({ name, value }) => {
		setForm({ ...form, [name]: value })

		if (value !== '') {
			if (name === 'password') {
				if (value.length < 8) {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `Password must include at least 8 characters and must include a capital case letter, a lower case and a number`
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'confirmPassword') {
				if (form.password !== value) {
					setErrors((prev) => {
						return { ...prev, [name]: `Passwords does not match` }
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'companyName') {
				if (value.length < 3) {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `Company name should be a minimum of 3 characters`,
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'companyEmail') {
				const regex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
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
			} else if (name === 'companyCountry') {
				if (value === '') {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `Please select country of business location`,
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'companyCity') {
				if (value.length < 3) {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `Please enter the city of business location`,
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'companyPhone') {
				let val
				let num = []
				num.push(value[0])
				num.push(value[1])
				num.push(value[2])
				val = num.join('')
				if (
					value.length !== 11 &&
					(val !== '070' || val !== '081' || val !== '080' || val !== '090')
				) {
					setErrors((prev) => {
						return { ...prev, [name]: `Please enter a valid phone number` }
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else {
				setErrors((prev) => {
					return { ...prev, [name]: null }
				})
			}
		} else {
			setErrors((prev) => {
				return { ...prev, [name]: `This field is required` }
			})
		}
	}

	const formatPhone = (phone) => {
		return phone.replace(/[0-9]/, '+234')
	}

	const register = async () => {
		setLoadingText('processing registration')
		setLoading(true)
		try {
			const res = await axiosInstance({
				url: '/business/register',
				method: 'POST',
				data: {
					name: form.companyName,
					email: form.companyEmail,
					password: form.password,
					// country: form.companyCountry,
					country: 'Nigeria',
					city: form.companyCity,
					phone: formatPhone(form.companyPhone),
				},
			})
			accessLocalStorage.setToLs('companyEmail', form.companyEmail)
			accessLocalStorage.setToLs('companyPhone', `+${form.companyPhone}`)

			window.location.assign('/otp-entry')
			setLoading(false)
			setTerms(false)

			const { data, message } = res
			const otpToken = data.data.otp.data
			accessLocalStorage.setToLs('otpToken', otpToken)
			toast.success(message, {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		} catch (error) {
			setLoading(false)
			setTerms(false)
			// console.log('err ', error);
			const err = error.response.data.message
			toast.error(err, {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		}
	}

	const onSubmit = () => {
		if (!form.companyName) {
			setErrors((prev) => {
				return { ...prev, companyName: 'Please add a company name' }
			})
		}

		if (!form.companyEmail) {
			setErrors((prev) => {
				return { ...prev, companyEmail: 'Please add a company email' }
			})
		}

		if (!form.companyCountry) {
			setErrors((prev) => {
				return {
					...prev,
					companyCountry: 'Please add the country of your company',
				}
			})
		}

		if (!form.companyCity) {
			setErrors((prev) => {
				return { ...prev, companyCity: 'Please add the city of your company' }
			})
		}

		if (!form.companyPhone) {
			setErrors((prev) => {
				return { ...prev, companyPhone: 'Please add a company phone number' }
			})
		}

		if (!form.password) {
			setErrors((prev) => {
				return { ...prev, password: 'Please add a password' }
			})
		}

		if (!form.confirmPassword) {
			setErrors((prev) => {
				return { ...prev, confirmPassword: 'Please confirm your password' }
			})
		}

		if (Object.values(form).length === 7) {
			register()
		} else {
			console.log(form)
			toast.warning('Please ensure all fields are filled.', {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		}
	}

	const getCountries = () => {
		let arr1 = []
		const { listCountries } = countries
		const countriesData = listCountries()
		countriesData.forEach((cur) => {
			arr1.push(cur['Country Name'])
		})
		setCountryList(arr1)
	}

	const checkScreenSize = () => {
		const screenWidth = window.innerWidth
		if (screenWidth < 768) {
			window.location.replace('/util-page')
		}
	}

	useEffect(() => {
		checkScreenSize()
		getCountries()
	}, [])

	return (
		<div className='parent-cont'>
			{/* for toast notification containing */}
			<ToastContainer />

			<div className='banner'>
				<Image src='assets/Logo.svg' alt='logo' width={200} />
			</div>

			<div className='body'>
				<div className='form-title'>Register</div>

				<div
					className='form-cont'
					style={{
						marginBottom: '100px',
					}}>
					<div className='input-holder'>
						<Input
							label={"Company's Name"}
							type={'text'}
							onChange={(e) => {
								const value = e.target.value
								onEnterValue({ name: 'companyName', value })
							}}
							error={errors.companyName}
						/>
					</div>

					<div className='input-holder'>
						<Input
							label={"Company's Email"}
							type={'email'}
							onChange={(e) => {
								const value = e.target.value
								onEnterValue({ name: 'companyEmail', value })
							}}
							error={errors.companyEmail}
						/>
					</div>

					<div className='location-cont'>
						<div className='location-cont-child'>
							<Input
								label={'Country'}
								type={'text'}
								value={'Nigeria'}
								onChange={(e) => {
									const value = e.target.value
									onEnterValue({ name: 'companyCountry', value })
								}}
								error={errors.companyCountry}
								disableInput={true}
							/>
							{/* <CustomSelector 
                            label={'Country'}
                            options={countryList}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyCountry', value})
                            }}
                            error={errors.companyCountry}
                        /> */}
						</div>

						<div className='location-cont-child'>
							{/* <Input 
                            label={'City'}
                            type={'text'}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyCity', value})
                            }}
                            error={errors.companyCity}
                        /> */}
							<CustomSelector
								label={'State'}
								options={StateNig}
								onChange={(e) => {
									const value = e.target.value
									onEnterValue({ name: 'companyCity', value })
								}}
								error={errors.companyCity}
							/>
						</div>
					</div>

					<div className='input-holder'>
						<div>
							<Input
								label={"Company's Phone number"}
								type={'tel'}
								value={form.companyPhone}
								onChange={(e) => {
									const value = e.target.value
									setPhone(value)
									onEnterValue({ name: 'companyPhone', value })
								}}
								error={errors.companyPhone}
							/>
							{/* <label className='phone-label'>Company's Phone number</label>
                        <PhoneInput
                            country={'ng'}
                            value={phone}
                            onChange={value => {
                                setPhone(value);
                                onEnterValue({name: 'companyPhone', value});
                            }}
                            placeholder={'eg +23470***********'}
                            enableSearch={true}
                            containerClass={'phone-cont'}
                            inputStyle={{width: '100%', height: '100%', borderRadius: 6}}
                            isValid={(value, country) => {
                                if(errors.companyPhone) {
                                    return errors.companyPhone;
                                } else {
                                    return false;
                                }
                            }}
                        /> */}
						</div>
					</div>

					<div className='input-holder'>
						<Input
							label={'Create Password'}
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
						<Input
							label={'Confirm Password'}
							type={!passwordB ? 'password' : 'text'}
							onChange={(e) => {
								const value = e.target.value
								onEnterValue({ name: 'confirmPassword', value })
							}}
							error={errors.confirmPassword}
							icon={
								!passwordB ? (
									<AiOutlineEyeInvisible
										style={{ fontSize: 20, marginRight: 15 }}
									/>
								) : (
									<AiOutlineEye style={{ fontSize: 20, marginRight: 15 }} />
								)
							}
							iconClick={() => setPasswordB(!passwordB)}
						/>
					</div>

					<div className='tc-cont'>
						<label className='check-box-cont'>
							<input type='checkbox' onClick={() => setTerms(!terms)} checked={terms} />
							<span className='checkmark'></span>
						</label>
						<span style={{ paddingTop: 10, marginLeft: 5 }}>
							By activating your account, you agree to our Terms and Conditions.
						</span>
					</div>

					<div className='input-holder'>
						<CustomButton
							title={'Register'}
							textColor={'#fff'}
							bgColor={'#03A63C'}
							disabledColor={'rgba(3, 166, 60, 0.5)'}
							disabled={!terms}
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

					<Link style={{ textDecoration: 'none' }} to={'/sign-in'}>
						<p className='otp-aux-link-2'>
							Click here to
							<span style={{ margin: '0px 5px' }} className='otp-aux-link'>
								sign in
							</span>
							if registered
						</p>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Register
