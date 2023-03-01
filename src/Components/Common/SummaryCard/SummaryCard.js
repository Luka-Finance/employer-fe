import React from 'react'
import { BiWallet } from 'react-icons/bi'
import { BsCheckLg, BsExclamationSquare } from 'react-icons/bs'
import { HiUsers } from 'react-icons/hi'
import getSymbolFromCurrency from 'currency-symbol-map'

import './Styles.css'

function SummaryCard({ data }) {

	const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
    });

	return (
		<div className='dashboard-card-cont'>
			<div className='dashboard-card' style={{ margin: '0px 20px 20px 0px' }}>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text' style={{ color: '#000' }}>
						<span>
							{formatter.format(data.totalEarnedThisMonth)}
						</span>
					</p>

					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<BiWallet style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>

				<p className='dashboard-card-text-2'>Total earned this month</p>
			</div>

			<div className='dashboard-card' style={{ margin: '0px 20px 20px 0px' }}>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text' style={{ color: '#000' }}>
						<span>
							{formatter.format(data.totalWithdrawn)}
						</span>
					</p>

					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<BsCheckLg style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>

				<p className='dashboard-card-text-2'>Total Withdrawn</p>
			</div>

			<div className='dashboard-card'>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text' style={{ color: '#C30000' }}>
						<span>
							{formatter.format(data.pendingBalance)}
						</span>
					</p>

					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(211, 56, 56, 0.1)' }}>
						<BsExclamationSquare style={{ fontSize: 20, color: '#C30000' }} />
					</p>
				</div>

				<p className='dashboard-card-text-2'>Pending Balance</p>
			</div>

			<div className='dashboard-card' style={{ margin: '0px 20px 20px 0px' }}>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text' style={{ color: '#000' }}>
						<span>
							{data.totalStaff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</span>
					</p>

					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<HiUsers style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>

				<p className='dashboard-card-text-2'>Total Employee</p>
			</div>

			<div className='dashboard-card' style={{ margin: '0px 20px 20px 0px' }}>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text' style={{ color: '#000' }}>
						<span>
							{data.activeStaffs
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</span>
					</p>

					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<HiUsers style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>

				<p className='dashboard-card-text-2'>Active Employee</p>
			</div>

			<div className='dashboard-card'>
				<div className='dashboard-card-head'>
					<p className='dashboard-card-text' style={{ color: '#000' }}>
						<span>
							{data.inactiveStaffs
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</span>
					</p>

					<p
						className='dashboard-card-icon-cont'
						style={{ backgroundColor: 'rgba(3, 166, 60, 0.1)' }}>
						<HiUsers style={{ fontSize: 20, color: '#03A63C' }} />
					</p>
				</div>

				<p className='dashboard-card-text-2'>Inactive Employee</p>
			</div>
		</div>
	)
}

export default SummaryCard
