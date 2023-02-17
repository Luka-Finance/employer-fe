import React, {useState, useEffect} from 'react';
import AuxPageHead from '../../../Components/AuxPageHead/AuxPageHead';
import Layout from '../../../Components/Layout/Layout';
import Input from '../../../Components/Common/Input/Input';
import CustomSelector from '../../../Components/Common/CustomSelector/CustomSelector';
import { BsExclamationCircle, BsCheckLg} from 'react-icons/bs';
import {MdClose, MdOutlineCloudUpload} from 'react-icons/md';
import CustomButton from '../../../Components/Common/CustomButton/Index';
import { toast, ToastContainer } from 'react-toastify';
import LoaderScreen from '../../../Components/Common/LoaderScreen/LoaderScreen';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../Utils/axiosInstance';
import './Styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { saveBusiness } from '../../../Redux/Actions/businessActions';
import { AiTwotoneDelete } from 'react-icons/ai';
// import PhoneInput from 'react-phone-input-2'

function Settings() {
  const [form, setForm] = useState({
    companyName: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingRC, setLoadingRC] = useState(false);
  const [loadingTIM, setLoadingTIN] = useState(false);
  const [loaderText, setLoaderText] = useState('');
  const [editForm, setEditForm] = useState(false);
  const businessData = useSelector(state => state.businessData);
  const {business} = businessData;
  const [cac, setCac] = useState('');
  const dispatch = useDispatch();
  // temporary presence, will delete later
  const [enterRC, setEnteredRC] = useState(false);
  const [enterTIN, setEnteredTIN] = useState(false);

  const onEnterValue = ({name, value}) => { 
    setForm({...form, [name]: value});

    if(value !== '') {

        if(name === 'companyName' || name === 'contactName') {

            if(value.length < 3) {
                setErrors(prev => {return {...prev, [name]: `Company name should be a minimum of 3 characters`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'rcNumber') {
            let prefix = value.substring(0, 2);
            console.log(prefix)
            if(prefix !== "RC" && prefix !== "BN") {
                setErrors(prev => {return {...prev, [name]: `Please enter a correct BN/RC number.`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'tinNumber') {

            if(value.length < 11 || value.length < 3) {
                setErrors(prev => {return {...prev, [name]: `Please enter correct TIN number.`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'companyPhone') {
            let val;
            let num = [];
            num.push(value[0]);
            num.push(value[1]);
            num.push(value[2]);
            val = num.join('');
            if (value.length !== 11 && (val !== '070' || val !== '081' || val !== '080' || val !== '090')) {
                setErrors(prev => {return {...prev, [name]: `Please enter a valid phone number`}});
            } else {
                setErrors(prev => {return {...prev, [name]: null}});
            }
        } else if (name === 'companyEmail') {

            const regex = new RegExp (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
            const isEmailValid = regex.test(value);

            if(value.length < 12 || !isEmailValid) {
                setErrors(prev => {return {...prev, [name]: `Company email should be properly formated`}});
            } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'contactName') {

            if(value.length < 3) {
                setErrors(prev => {return {...prev, [name]: `Contact name should be a minimum of 3 characters`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'contactRole') {

            if(value.length < 3) {
                setErrors(prev => {return {...prev, [name]: `Contact role should be a minimum of 4 characters`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'contactEmail') {

            const regex = new RegExp (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
            const isEmailValid = regex.test(value);

            if(value.length < 12 || !isEmailValid) {
                setErrors(prev => {return {...prev, [name]: `Company email should be properly formated`}});
            } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'contactPhone') {
            let val;
            let num = [];
            num.push(value[0]);
            num.push(value[1]);
            num.push(value[2]);
            val = num.join('');
            if (value.length !== 11 && (val !== '070' || val !== '081' || val !== '080' || val !== '090' || val !== '+234')) {
                setErrors(prev => {return {...prev, [name]: `Please enter a valid phone number`}});
            } else {
                setErrors(prev => {return {...prev, [name]: null}});
            }
        } else if (name === 'companyAddress') {

            if(value.length < 15) {
                setErrors(prev => {return {...prev, [name]: `Enter correct address`}});
              } else {
                setErrors(prev => {return {...prev, [name]: null}});
            };

        } else if (name === 'companyCountry') {

            if(value.length < 5) {
              setErrors(prev => {return {...prev, [name]: `Select the country`}});
            } else {
              setErrors(prev => {return {...prev, [name]: null}});
            };
    
        } else if (name === 'companyCity') {

            if(value.length < 5) {
              setErrors(prev => {return {...prev, [name]: `Select the city`}});
            } else {
              setErrors(prev => {return {...prev, [name]: null}});
            };
    
        } else if (name === 'payTransactionFee') {

            if(value.length < 5) {
              setErrors(prev => {return {...prev, [name]: `Select select who pays transaction fee`}});
            } else {
              setErrors(prev => {return {...prev, [name]: null}});
            };
    
        } else if (name === 'paymentDate') {

            if(value < 1 || value > 28) {
              setErrors(prev => {return {...prev, [name]: `Enter value between 1 and 28`}});
            } else {
              setErrors(prev => {return {...prev, [name]: null}});
            };
    
        }

    } else {
        setErrors(prev => {return {...prev, [name]: `This field is required`}});  
    }
  };

  const verifyRcNUmber = async(value) => {
    if(value.length === 9) {
        setLoadingRC(true);
        try {
            const res = await axiosInstance({
                url: '/business/verify/rc',
                method: 'POST',
                data: {
                    companyName: form.companyName,
                    rcNumber: form.rcNumber
                }
            });
            const {message} = res.data;
            updateProfile();
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
            });
            setLoadingRC(false);
            return(<ToastContainer />)
        } catch (error) {
            setForm({...form, ['rcNumber']: ''});
            setLoadingRC(false);
            const err = error.response.data.message;
            setErrors(prev => {return {...prev, ['rcNumber']: `${err}`}});
            console.log('rc error data  ', error)
            console.log('rc erro  ', err)
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />)
        }
    }
  };

  const verifyTin = async(value) => {
    if(value.length === 13) {
        setLoadingTIN(true);
        try {
            const res = await axiosInstance({
                url: '/business/verify/tin',
                method: 'POST',
                data: {
                    ompanyName: form.companyName,
                    searchParameter: value,
                }
            });
            const {message} = res.data;
            updateProfile();
            toast.success(message, {
                position: toast.POSITION.TOP_RIGHT
            });
            setLoadingTIN(false);
            return(<ToastContainer />)
        } catch (error) {
            setForm({...form, ['tinNumber']: ''});
            setLoadingTIN(false);
            const err = error.response.data.message
            setErrors(prev => {return {...prev, ['tinNumber']: `${err}`}});
            toast.error(err, {
                position: toast.POSITION.TOP_RIGHT
            })
            return(<ToastContainer />)
        }
    }
  };

  const getUserData = async() => {
    
    setLoaderText('fetching data');
    setLoading(true);
    try {
      const res = await axiosInstance({
        method: 'GET',
        url: '/business/me',
      });
      const {data, message} = res.data;
      dispatch(saveBusiness(data))
      setLoading(false);

      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
      });
      return(<ToastContainer />)
    } catch(error) {
      setLoading(false);
    //   console.log(error);
      // const err = error.response.data.message
      toast.error('Error fetching data.', {
        position: toast.POSITION.TOP_RIGHT
      })
      return(<ToastContainer />)
    };

};

    
const updateProfile = async() => {
    setLoaderText('Updating profile');
    setLoading(true);

    if(form.rcNumber !== '') {
        setEnteredRC(true);
    }

    if(form.tinNumber !== '') {
        setEnteredTIN(true);
    }

    try {
      const res = await axiosInstance({
        url: '/business/update-profile',
        method: 'PATCH',
        data: {
            name: form.companyName,
            phone: form.companyPhone,
            country: form.companyCountry,
            city: form.companyCity, 
            email: form.companyEmail,
            paysTransactionFee: form.payTransactionFee || 'Employee',
            payday: form.paymentDate || 28,
            rcNumber: form.rcNumber === "" ? null : form.rcNumber,
            type: 'registered',
            address: form.companyAddress,
            contactPersonName: form.contactName,
            contactPersonEmail: form.contactEmail,
            contactPersonRole: form.contactRole,
            contactPersonPhone: form.contactPhone,
            cacDoc: cac,
            staffStrength: form.staffStrength,
            tin: form.tinNumber,
        }
      });
      setEditForm(false);
      initializeForm();
      setCac('');
      const {message} = res.data;
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });
        setLoading(false); 
        getUserData();
        return(<ToastContainer />)  
    } catch (error) {
        setLoading(false);
        const err = error.response.data.message
        toast.error(err, {
            position: toast.POSITION.TOP_RIGHT
        })
        return(<ToastContainer />)   
    }
};

const initializeForm = () => {
    // setErrors(prev => {return {...prev}});
    setForm({
        ...form, 
        companyName: business?.name,
        companyEmail: business?.email,
        companyPhone: business?.phone,
        contactName: business?.contactPersonName === null ? '' : business?.contactPersonName,
        contactRole: business?.contactPersonRole === null ? '' : business?.contactPersonRole,
        contactEmail: business?.contactPersonEmail === null ? '' : business?.contactPersonEmail,
        contactPhone: business?.contactPersonPhone === null ? '' : business?.contactPersonPhone,
        rcNumber: business?.rcNumber === null ? '' : business?.rcNumber,
        tinNumber: business?.tin === null ? '' : business?.tin,
        paymentDate: business?.payday === null ? '' : business?.payday,
        staffStrength: business?.staffStrength === null ? '' : business?.staffStrength,
        kycStatus: business?.kycStatus
    });
};

  const allowEdit = (paramA, paramB) => {
    if(paramA === true && paramB) {
        return false;
    } else if(paramA === true && !paramB) {
        return true;
    }
  };

    const checkForKyc = () => {
        const rcNumber = business?.rcNumber;
        if(rcNumber === null || rcNumber === '') {
            toast.warning('Please complete your KYC.', {
                position: toast.POSITION.TOP_RIGHT
            }); 
            return(<ToastContainer />);
        }
    };

    const uploadCac = async(e) => {
        e?.preventDefault()
        let myFile = e.target.files[0];
        if(!myFile) {return};
        setLoading(true);
    
        if(myFile.size < 1000000) {
            setCac(myFile);
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            let response = await fetch('https://api.luka.finance/business/upload-files?dir=doc', {
                method: 'POST',
                body: formData
            });
            // console.log(response)
            console.log(response.url)
            if(response.status === 200) {
                setLoading(false);
                // setCac(response.url);
                toast.success('Great! click on "save" to complete your upload.', {
                    position: toast.POSITION.TOP_RIGHT
                }); 
                return(<ToastContainer />);
            } else {
                setLoading(false);
                toast.warning('Error, please try again.', {
                    position: toast.POSITION.TOP_RIGHT
                }); 
                return(<ToastContainer />);
            }

        } else if (myFile.size > 1000000) {
            setCac('');
            setLoading(false);
            toast.warning('File size to large, please maximum of 1mb.', {
                position: toast.POSITION.TOP_RIGHT
            }); 
            return(<ToastContainer />);
        }
        
    
    };

  useEffect(() => {
    initializeForm();
    checkForKyc();
  }, [business, businessData])

//   useEffect(() => {
//     checkForKyc();
//   }, [])

  if(loading) {
    return (<LoaderScreen loadingText={loaderText} />)
  }

  return (
    <Layout currentPage={'settings'}>
        {/* for toast notification containing */}
        <ToastContainer />

        <AuxPageHead 
         auxHeadFilter={false}
         auxHeadTitle={'Settings'}
         auxBtnAppear={false}
        />
        <div className='settings-dashboard'>

            <div className='settings-sub-cont'>
               <div className='settings-form-title-cont'>
                    <p className='settings-form-title'>
                        Profile Settings
                    </p>
               </div>

               <div className='settings-sub-form-cont'>
                    <div className='settings-input-cont-aux'>
                        <Input 
                            label={'Company name'}
                            type={'text'}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyName', value})
                            }}
                            value={form.companyName}
                            error={errors.companyName}
                            inputHt={50}
                            disableInput={!editForm}
                        />

                        <div className='adjust-btn-cont'>
                        <p 
                            onClick={() => {
                                if(!editForm) {
                                    setEditForm(true);
                                } else {
                                    updateProfile();
                                    setEditForm(false);
                                }
                            }} 
                            className='edit-and-save-btn'
                        >
                            {editForm ? 'Save' : 'Edit'}
                        </p>
                        <span 
                            className='cancel-btn'
                            style={{
                                display: editForm ? 'inline-block' : 'none'
                            }}
                            onClick={() => {
                                setEditForm(false);
                                initializeForm();
                            }}
                        >
                            Cancel
                        </span>
                        </div>
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'Company email'}
                            type={'email'}
                            value={form.companyEmail}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyEmail', value});
                            }}
                            error={errors.companyEmail}
                            disableInput={!editForm}
                        />
                    </div>

                    <div className='settings-input-cont'>
                        <Input 
                            label={'Company phone number'}
                            type={'tel'}
                            value={form.companyPhone}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'companyPhone', value})
                            }}
                            error={errors.companyPhone}
                            inputHt={50}
                            disableInput={!editForm}
                        />
                    </div>

                    <div className='settings-sub-form-cont-child'>
                        <div className='settings-input-cont'>
                            <Input 
                                label={'Contact person name'}
                                type={'text'}
                                value={form.contactName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'contactName', value})
                                }}
                                error={errors.contactName}
                                inputHt={50}
                                disableInput={!editForm}
                            />
                        </div>

                        <div className='settings-input-cont'>
                             <CustomSelector
                                initialValue={form.contactRole}
                                label={'Contact person role'}
                                options={['CEO', 'COO', 'Founder', 'Accountant', 'Finance Lead', 'Human Resource Personnel', 'Developer']}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // onEnterValue({name: 'payTransactionFee', value})
                                    onEnterValue({name: 'contactRole', value})
                                }}
                                error={errors.contactRole}
                                inputHt={50}
                                disableSelect={!editForm}
                            />
                        </div>
                    </div>

                    <div className='settings-sub-form-cont-child'>
                        <div className='settings-input-cont'>
                            <Input 
                                label={'Contact person email'}
                                type={'email'}
                                value={form.contactEmail}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'contactEmail', value})
                                }}
                                error={errors.contactEmail}
                                inputHt={50}
                                disableInput={!editForm}
                            />
                        </div>

                        <div className='settings-input-cont'>
                            <Input 
                                label={'Contact person phone'}
                                type={'tel'}
                                value={form.contactPhone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'contactPhone', value})
                                }}
                                error={errors.contactPhone}
                                inputHt={50}
                                disableInput={!editForm}
                            />
                        </div>
                    </div>

                    <div className='settings-sub-form-cont-child'>
                        <CustomSelector
                            initialValue={form?.staffStrength === null ? 'Select staff strenght' : form?.staffStrength}
                            label={'Staff strength'}
                            options={['1-10', '11-50', '51-200', '201- and above']}
                            onChange={(e) => {
                                const value = e.target.value;
                                // onEnterValue({name: 'payTransactionFee', value})
                                onEnterValue({name: 'staffStrength', value})
                            }}
                            inputHt={50}
                            disableSelect={!editForm}
                        />
                    </div>
               </div> 
            </div>

            <div className='settings-sub-cont'>

                <div className='settings-form-title-cont'>
                    <p className='settings-form-title'>
                        Business Verification
                        and KYC (Document
                        Verification)
                    </p>
               </div> 

               <div className='settings-sub-form-cont'>
                    <div className='settings-input-cont-plus-extra'>
                        <div style={{flex: 1}}>
                            <Input 
                                // maxLength={9}
                                label={'BN / RC Number'}
                                placeholder={'eg BN1234567 or RC1081237'}
                                type={'text'}
                                value={form.rcNumber}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'rcNumber', value});
                                    // verifyRcNUmber(value);
                                }}
                                error={errors.rcNumber}
                                inputHt={50}
                                disableInput={!editForm}
                            />
                            {/* {loadingRC && (<h5 style={{color: 'green'}}>Saving R.C number....</h5>)} */}
                            {!loadingRC && (<p style={{color:'rgba(3, 166, 60, 1)'}} className='number-status-text'>
                                {/* {(!errors.rcNumber && business?.rcNumber) ? 'RC number verified' : ''} */}
                                {(form.rcNumber !== '' &&  form.kycStatus === 'pending') && 'Pending approval'}
                            </p>)}
                        </div>
                        {/* <div className="number-status-icon-cont">
                            {
                                !loadingRC && (
                                    <>
                                        {
                                            business?.rcNumber  ? (
                                            <BsCheckLg style={{color: 'rgba(3, 166, 60, 1)'}} />
                                            ) : (
                                            <MdClose style={{color: 'rgba(195, 0, 0, 1)', fontSize: 18}} />
                                            )
                                        }
                                    </>
                                )
                            }
                        </div> */}
                    </div>

                    <div className='settings-input-cont-plus-extra'>
                        <div style={{flex: 1}}>
                            <Input 
                                // maxLength={13}
                                label={'JTB / FIRS TIN Number'}
                                placeholder={'eg 1234567890 or 12345678-0001'}
                                type={'text'}
                                value={form.tinNumber}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    onEnterValue({name: 'tinNumber', value});
                                    // verifyTin(value);
                                }}
                                error={errors.tinNumber}
                                inputHt={50}
                                disableInput={!editForm}
                            />
                            {/* {loadingTIM && (<h5 style={{color: 'green'}}>Saving TIN number....</h5>)} */}
                            {!loadingTIM && (<p style={{color:  'rgba(3, 166, 60, 1)'}} className='number-status-text'>
                                {/* {(!errors.tinNumber && business?.tin) ? 'TIN verified' : ''} */}
                                {(form.tinNumber !== '' &&  form.kycStatus === 'pending') && 'Pending approval'}
                            </p>)}
                        </div>
                        {/* <div className="number-status-icon-cont">
                            {
                                !loadingTIM && (
                                    <>
                                        {
                                            business?.tin  ? (
                                            <BsCheckLg style={{color: 'rgba(3, 166, 60, 1)'}} />
                                            ) : (
                                            <MdClose style={{color: 'rgba(195, 0, 0, 1)', fontSize: 18}} />
                                            )
                                        }
                                    </>
                                )
                            }
                        </div> */}
                    </div>

                    <p className='cac-input-label'>Upload your CAC certificate</p>
                    <form onSubmit={uploadCac} className='upload-cont' style={{backgroundColor: !editForm ? '#EBEBE4' : 'transparent' }}>
                        <label type={"submit"} htmlFor='cac-upload' style={{cursor: 'pointer'}} className='upload-label'>
                           <MdOutlineCloudUpload style={{color: '#333', fontSize: 22}} /> 
                        </label>

                        <input id='cac-upload' onChange={uploadCac} className='cac-upload-input' type={'file'} disabled={!editForm} />

                        <div className='cac-upload-file-name-cont'>
                            <p className='cac-upload-file-name'>
                                {cac.name || 'Upload either a PDF, JPEG or PNG file'}
                            </p>

                            {cac.name && (<AiTwotoneDelete onClick={() => setCac('')} style={{fontSize: 20, color: 'red', cursor: 'pointer'}} />)}
                        </div>
                    </form>
               </div>

            </div>

            <div className='settings-sub-cont'>

                <div className='settings-form-title-cont'>
                    <p className='settings-form-title'>
                        Earned Wage Settings
                    </p>
               </div> 

               <div className='settings-sub-form-cont'>
                    <div className='settings-input-cont'>
                        <Input 
                            label={'Set monthly pay day [1 - 28]'}
                            type={'number'}
                            value={form.paymentDate}
                            placeholder={'Enter a number between 1 - 28'}
                            onChange={(e) => {
                                const value = e.target.value;
                                onEnterValue({name: 'paymentDate', value})
                            }}
                            error={errors.paymentDate}
                            inputHt={50}
                            disableInput={!editForm}
                        />
                    </div>

                    <div className='scheduled-payment-cont'>
                        <span>
                            <BsExclamationCircle 
                                style={{
                                    color: '#03A63C',
                                    marginBottom: 20,
                                    marginRight: 10
                                }} 
                            />
                        </span>

                        <p>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                            On this day you have written here, we will reset all your employee card back to Zero
                        </p>
                    </div>

                    <div className='settings-btn-alpha-cont'>
                        <div className='settings-form-btn-cont'>
                            <CustomButton
                                onClick={() => updateProfile()} 
                                title={'Save Changes'}
                                textColor={'#fff'}
                                bgColor={'rgba(3, 166, 60, 1)'}
                                disabledColor={'rgba(3, 166, 60, 0.5)'}
                                disabled={false}
                                btnHeight={47}
                                
                            />
                        </div>

                        {
                            editForm && (
                                <div className='settings-form-btn-cont'>
                                    <CustomButton
                                        onClick={() => {
                                            initializeForm();
                                            setEditForm(false);                                      
                                        }} 
                                        title={'Cancel changes'}
                                        textColor={'#fff'}
                                        bgColor={'#FF0000'}
                                        disabledColor={'#A52A2A'}
                                        disabled={false}
                                        btnHeight={47}
                                    />
                                </div>
                            )
                        }
                    </div>
               </div>
            </div>
            

        </div>
    </Layout>
  );
};

export default Settings;