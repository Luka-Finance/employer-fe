import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../Components/Layout/Layout'
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead'
import Modal from 'react-bootstrap/Modal'
import CustomButton from '../../../Components/Common/CustomButton/Index'
import Input from '../../../Components/Common/Input/Input'
import { InputListOne } from '../../../Components/Common/InputListOne/InputListOne'
// import {FaRegPlusSquare} from 'react-icons/fa';
import { BsCheck2 } from 'react-icons/bs'
// import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import SummaryCard from '../../../Components/Common/SummaryCard/SummaryCard'
import './Styles.css'
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen'
import axiosInstance from '../../../Utils/axiosInstance'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Spinner from 'react-bootstrap/Spinner'

function Dashboard() {
	const businessData = useSelector((state) => state.businessData)
	const [show, setShow] = useState(false)
	const [created, setCreated] = useState(false)
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		salary: 0,
		startDate: '',
	})
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)
	const [loadingStaffAdd, setLoadingStaffAdd] = useState(false)
	const [loaderText, setLoaderText] = useState('')
	const [stats, setStats] = useState({
		totalEarnedThisMonth: 0,
		totalWithdrawn: 0,
		pendingBalance: 0,
		totalStaff: 0,
		activeStaffs: 0,
		inactiveStaffs: 0,
	})
	const [disable, setDisable] = useState(true)

	const { business } = businessData

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const onEnterValue = ({ name, value }) => {
		setForm({ ...form, [name]: value })

		if (value !== '') {
			if (name === 'firstName') {
				if (value.length < 3) {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `First name should be a minimum of 3 characters`,
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'role') {
				if (value.length < 2) {
					setErrors((prev) => {
						return { ...prev, [name]: `Select an employment type` }
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'middleName') {
				if (value.length < 3) {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `Middle name should be a minimum of 3 characters`,
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'lastName') {
				if (value.length < 3) {
					setErrors((prev) => {
						return {
							...prev,
							[name]: `Surname name should be a minimum of 3 characters`,
						}
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'phone') {
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
			} else if (name === 'email') {
				// const regex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
				const regex = new RegExp(/\S+@\S+\.\S+/)
				const isEmailValid = regex.test(value)

				if (value.length < 12 || !isEmailValid) {
					setErrors((prev) => {
						return { ...prev, [name]: `Email should be properly formated` }
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'salary') {
				if (value < 500) {
					setErrors((prev) => {
						return { ...prev, [name]: `Enter mininum salary of N500` }
					})
				} else {
					setErrors((prev) => {
						return { ...prev, [name]: null }
					})
				}
			} else if (name === 'startDate') {
				if (!value) {
					setErrors((prev) => {
						return { ...prev, [name]: `Enter date` }
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

	const getErrors = (label) => {
		for (const key in errors) {
			if (label === key) {
				return errors[key]
			}
		}
	}

	const formatMyDate = (value) => {
		let formatedDate = []
		let arr = []
		formatedDate.push(value.split('-')[0])
		formatedDate.push(value.split('-')[1])
		formatedDate.push(value.split('-')[2])
		arr.push(formatedDate[2])
		arr.push(formatedDate[1])
		arr.push(formatedDate[0])
		let properDate = arr.join('-')
		return properDate
	}

	const onSubmit = async () => {
		if (!form.firstName) {
			setErrors((prev) => {
				return { ...prev, companyName: 'Required' }
			})
		}

		if (!form.lastName) {
			setErrors((prev) => {
				return { ...prev, companyEmail: 'Required' }
			})
		}

		if (!form.phone) {
			setErrors((prev) => {
				return { ...prev, companyCountry: 'Required' }
			})
		}

		if (!form.email) {
			setErrors((prev) => {
				return { ...prev, companyCity: 'Required' }
			})
		}

		if (!form.salary) {
			setErrors((prev) => {
				return { ...prev, companyPhone: 'Required' }
			})
		}

		if (!form.startDate) {
			setErrors((prev) => {
				return { ...prev, password: 'Required' }
			})
		}

		if (Object.values(form).length === 6) {
			setLoadingStaffAdd(true)
			try {
				const res = await axiosInstance({
					url: '/business/create-staff',
					method: 'POST',
					data: {
						firstName: form.firstName,
						lastName: form.lastName,
						email: form.email,
						phone: form.phone,
						salary: form.salary,
						// role: form.role,
						role: 'regular',
						businessId: business.id,
						startDate: formatMyDate(form.startDate),
					},
				})
				const { message } = res.data
				// console.log('res ', res);
				toast.success(message, {
					position: toast.POSITION.TOP_RIGHT,
				})
				setLoadingStaffAdd(false)
				setCreated(true)
				getBusinessStats()
				return <ToastContainer />
			} catch (error) {
				setLoadingStaffAdd(false)
				// console.log('err ', error.message);
				const err = error.response.data.message
				toast.error(err, {
					position: toast.POSITION.TOP_RIGHT,
				})
				return <ToastContainer />
			}
		} else {
			toast.warning('Please ensure all fields are filled.', {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		}
	}

	const getBusinessStats = async () => {
		setLoaderText('Fetching stats')
		setLoading(true)
		try {
			const res = await axiosInstance({
				url: '/business/stats',
				method: 'GET',
			})
			const { data, message } = res.data
			setStats(data)
			// toast.success(message, {
			//   position: toast.POSITION.TOP_RIGHT
			// });
			setLoading(false)
			// return(<ToastContainer />)
		} catch (error) {
			setLoading(false)
			const err = error.response.data.message
			toast.error(err, {
				position: toast.POSITION.TOP_RIGHT,
			})
			return <ToastContainer />
		}
	}

	useEffect(() => {
		if (
			form.firstName.length > 2 &&
			form.lastName.length > 2 &&
			form.phone.length > 10 &&
			form.email.length > 11 &&
			form.salary > 499 &&
			form.startDate
		) {
			setDisable(false)
		} else {
			setDisable(true)
		}
	}, [form])

	useEffect(() => {
		if (Object.keys(business).length > 0) {
			getBusinessStats()
		}
	}, [business])

	if (loading) {
		return <LoaderScreen loadingText={loaderText} />
	}

	return (
		<Layout currentPage={'dashboard'}>
			<AuxPageHead
				auxHeadTitle={'Overview'}
				auxHeadFilter={false}
				auxHeadBtnClick={handleShow}
				auxBtnTitle={'Add new employee'}
				auxBtnAppear={true}
				auxBtnIcon={<></>}
			/>

			<SummaryCard data={stats} />

			<Modal
				show={show}
				onHide={handleClose}
				size={'xl'}
				className='employee-modal'
				centered>
				{!created ? (
					<>
						<p
							className='dashboard-card-text'
							style={{ fontSize: 20, paddingTop: 20, paddingLeft: 15 }}>
							Add a new employee
						</p>

						<div className='employee-form-cont'>
							{/* <div className='employee-form-input-cont'>
                  <CustomSelector
                    label={'Select Employment type*'}
                    options={['regular']}
                    onChange={(e) => {
                      const value = e.target.value;
                      onEnterValue({name: 'role', value})
                    }}
                    error={errors.employmentType}
                  />
                </div> */}
							{InputListOne.map((input) => {
								const { label, id, type, tag } = input;
								const leap = 1
								var CurrentDate = new Date();
								const max = new Date(CurrentDate.setMonth(CurrentDate.getMonth() + leap)).toISOString().split('T')[0];
								return (
									<div key={id} className='employee-form-input-cont'>
										<Input
											label={label}
											type={type}
											maxDate={type === 'date' && max}
											onChange={(e) => {
												const value = e.target.value
												onEnterValue({ name: tag, value })
												getErrors(tag)
											}}
											inputHt={40}
											error={getErrors(tag)}
										/>
									</div>
								)
							})}
						</div>

						<Modal.Footer>
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>
								<p
									onClick={handleClose}
									style={{
										color: '#EB5757',
										fontWeight: '500',
										cursor: 'pointer',
										fontSize: 16,
									}}>
									Close
								</p>

								<div style={{ width: !loadingStaffAdd ? 80 : 120 }}>
									<CustomButton
										btnHeight={47}
										onClick={onSubmit}
										title={'Add'}
										textColor={'#fff'}
										bgColor={'rgba(3, 166, 60, 1)'}
										disabled={disable}
										disabledColor={'rgba(3, 166, 60, 0.5)'}
										btnFontSize={13}
										icon={
											loadingStaffAdd && (
												<Spinner
													style={{ marginTop: 5, marginLeft: 15 }}
													animation='border'
													variant='light'
												/>
											)
										}
									/>
								</div>
							</div>
						</Modal.Footer>
					</>
				) : (
					<div className='success-employee-body'>
						<div className='success-employee-check-cont'>
							<BsCheck2 style={{ fontSize: 150, color: '#03A63C' }} />
						</div>

						<p className='success-emplyee-title'>Employee Successfully Added</p>

						<p
							style={{ cursor: 'pointer' }}
							onClick={() => {
								handleClose()
								setCreated(false)
							}}
							className='success-emplyee-text'>
							Go to account
						</p>
					</div>
				)}
			</Modal>
		</Layout>
	)
}

export default Dashboard
