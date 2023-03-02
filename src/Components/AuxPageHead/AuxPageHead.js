import React from 'react';
import CustomButton from '../Common/CustomButton/Index';

import './Styles.css'

function AuxPageHead({
    auxHeadTitle,
    auxHeadFilter,
    auxHeadBtnClick,
    auxBtnTitle,
    auxBtnIcon,
    auxBtnAppear,
    onAuxSearchChange,
    auxBtnWt,
    payBtn,
    payBtnClick,
}) {
  return (
    <div className='aux-head-cont'>
        {
            !auxHeadFilter ? (
                <p className='aux-head-btn-text'>
                    {auxHeadTitle}
                </p>
            ) : (
                <div className='filter-btn-cont'>
                    <p className='filter-btn-text'>Search</p>

                    <div className='filter-btn-aux-cont'>
                       <input
                            placeholder='enter employee name' 
                            type={'text'} 
                            className='filter-search-input' 
                            onChange={onAuxSearchChange}
                        />
                    </div>
                </div>
            )
        }

        {
            auxBtnAppear ? (
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 400}}>
                    {
                        payBtn && (
                            <button 
                                className='pay-btn'
                                onClick={payBtnClick}
                            >
                                Pay
                            </button>
                        )
                    }

                    <div
                        style={{width: !auxBtnWt ? 198 : auxBtnWt}}  
                        className='aux-head-btn-cont'
                    >
                        <CustomButton
                            btnHeight={47}
                            onClick={auxHeadBtnClick} 
                            title={auxBtnTitle}
                            textColor={'#fff'}
                            bgColor={'rgba(3, 166, 60, 1)'}
                            disabled={false}
                            icon={auxBtnIcon}
                            btnFontSize={13}
                        />
                    </div>
                </div>
            ) : ('')
        }
    </div>
  )
};

export default AuxPageHead;