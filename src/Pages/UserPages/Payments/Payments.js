import React, {useState, useEffect} from 'react';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Layout from '../../../Components/Layout/Layout';
import CustomTableTwo from '../../../Components/Common/CustomTableTwo/CustomTableTwo';
import '../Accounts/Styles.css'
import '../../../Components/Common/SummaryCard/Styles.css'
import axiosInstance from '../../../Utils/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen';
import getSymbolFromCurrency from 'currency-symbol-map';
import {BsExclamationSquare} from 'react-icons/bs';
import { Modal } from 'react-bootstrap';
import PaymentMethod from './PaymentMethods';

function Payments() {
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState('');
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalEarnedThisMonth: 0,
    totalWithdrawn: 0,
    pendingBalance: 0,
    totalStaff: 0,
    activeStaffs: 0,
    inactiveStaffs: 0
  });
  const [details, setDetails] = useState({});
  const [accDetails, setAccDetails] = useState({});
  const [paymentStat, setPaymentStat] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseA = () => setShowA(false);
  const handleShowA = () => setShowA(true);

  const getBusinessStats = async() => {
    setLoaderText('Fetching stats');
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: '/business/stats',
        method: 'GET'
      });
      const {data, message} = res.data;
      setStats(data);
      // toast.success(message, {
      //   position: toast.POSITION.TOP_RIGHT
      // });
      setLoading(false);
      // return(<ToastContainer />)
    } catch (error) {
      setLoading(false);
      const err = error.response.data.message
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
      })
      return(<ToastContainer />)
    }
  }; 

  const getPaymentHistory = async() => {
    setLoaderText('Fetching payments');
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: '/business/get-invoices',
        method: 'GET'
      });
      const {data, message} = res.data;
      setPayments(data);
      // toast.success(message, {
      //   position: toast.POSITION.TOP_RIGHT
      // });
      setLoading(false);
      // return(<ToastContainer />)
    } catch (error) {
      setLoading(false);
      const err = error.response.data.message
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
      })
      return(<ToastContainer />)
    }
  }; 

  const getPaymentDetails = async() => {
    setLoaderText('Fetching payment details');
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: '/business/get-payment-account',
        method: 'GET'
      });
      const {data, message} = res.data;
      setDetails(data);
      // toast.success(message, {
      //   position: toast.POSITION.TOP_RIGHT
      // });
      setLoading(false);
      // return(<ToastContainer />)
    } catch (error) {
      setLoading(false);
      const err = error.response.data.message
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
      })
      return(<ToastContainer />)
    }
  }; 

  const downloadInvoice = async(id) => {
    console.log(id)
    setLoaderText('downloading invoice');
    setLoading(true);

    try {
      const res = await axiosInstance({
        url: '/business/get-invoices',
        method: 'GET',
      });
      const data = res.data.data;
      if(data.length > 0) {
        let invoice;
        data.forEach((cur) => {
          if(cur.id === id) {
            invoice = cur
          } 

          // if(cur.file !== null) {
          //   console.log('got a file')
          //   console.log(cur)
          // } else {
          //   console.log('no file') 
          // }
        })
        const link = document.createElement('a');
        link.href = invoice.file;
        link.click();
      } else {
        toast.warning('No invoice data available.', {
          position: toast.POSITION.TOP_RIGHT
        })
        return(<ToastContainer />)
      }
      
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error('Error downoading invoice.', {
        position: toast.POSITION.TOP_RIGHT
      })
      return(<ToastContainer />)
    }

  };

  const getAccountDetails = async() => {
    setLoaderText('Fetching account details');
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: '/business/get-payment-account',
        method: 'GET'
      });
      const {data, message} = res.data;
      setAccDetails(data);
   
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error.response.data.message
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
      })
      return(<ToastContainer />)
    }
  };

  const getInvoiceDetails = async(id) => {
    setLoading(true);
    try {
      const res = await axiosInstance({
        url: `/business/invoice/get-details/${id}`,
        method: 'GET'
      });
      console.log(res);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handlePayment = () => {
    handleCloseA();
    setPaymentStat(1);
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  useEffect(() => {
    getBusinessStats();
    getPaymentHistory();
    getPaymentDetails();
    getAccountDetails();
  }, [])

  if(loading) {
    return(<LoaderScreen loadingText={loaderText} />)
  }

  return (
    <Layout currentPage={'payments'}>
        <AuxPageHead 
          auxHeadFilter={false}
          auxHeadTitle={'Payments'}
          auxHeadBtnClick={downloadInvoice}
          auxBtnTitle={'Download Invoice'}
          auxBtnAppear={false}
        />

        <div 
          className='dashboard-card-cont'
          onClick={handleShowA}
          style={{cursor: 'pointer'}}
        >
          <div 
           className='dashboard-card'
          >
          <div className='dashboard-card-head'>
            <p className='dashboard-card-text' style={{color: '#C30000'}} >
              {/* <span style={{marginRight: 5}}>{(getSymbolFromCurrency('NGN'))}</span> */}
              <span>
              {formatter.format(stats.pendingBalance)}
                {/* {
                  stats.pendingBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                 
                } */}
              </span>
            </p>

						<p
							className='dashboard-card-icon-cont'
							style={{ backgroundColor: 'rgba(211, 56, 56, 0.1)' }}>
							<BsExclamationSquare style={{ fontSize: 20, color: '#C30000' }} />
						</p>
					</div>

					<p className='dashboard-card-text-2'>{paymentStat === 0 ? "Pending Balance" : "Validating Payment"}</p>
				</div>
			</div>

			<div className='transaction-dashboard'>
				{payments.length < 1 ? (
					<p className='empty-state-text'>No Payments made yet</p>
				) : (
					<CustomTableTwo 
            data={payments} 
            download={downloadInvoice} 
          />
				)}
			</div>

      <Modal
        show={showA} 
        onHide={handleCloseA}
        size={'md'}
        centered
      >
        <PaymentMethod accDetails={accDetails} closeModal={handlePayment} />
      </Modal>

      <Modal
        show={show} 
        onHide={handleClose}
        size={'lg'}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Payment details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{margin: '10px 0px'}}>
              <span style={{marginRight: 20}}>
                Account name:
              </span>

						<span>{details.walletName}</span>
					</div>

					<div style={{ margin: '10px 0px' }}>
						<span style={{ marginRight: 20 }}>Account number:</span>

						<span>{details.wallet}</span>
					</div>

					<div style={{ margin: '10px 0px' }}>
						<span style={{ marginRight: 20 }}>Bank name:</span>

						<span>{details.bankName}</span>
					</div>

					<div style={{ margin: '10px 0px' }}>
						<span style={{ marginRight: 20 }}>Bank number:</span>

						<span>{details.accountNumber}</span>
					</div>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button onClick={props.onHide}>Close</Button> */}
				</Modal.Footer>
			</Modal>
		</Layout>
	)
};

export default Payments;