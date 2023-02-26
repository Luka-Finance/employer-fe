import React from 'react';

import './Styles.css';

function CustomSelector({
  label,
  options,
  onChange,
  error,
  disableSelect,
  initialValue
}) {
  return (
    <div className='selector-cont'>
      <label htmlFor={label} className="selecttor-label">{label}</label>

      <div style={{backgroundColor: disableSelect ? '#E8E5E5' : '#F7F7F7'}} className='selector-wrapper'>
        <select onChange={onChange} name={label} id={label} className='selector-self' disabled={disableSelect && disableSelect}>
          <option value="">{initialValue && initialValue}</option>
          {
            options.map((opt, index) => (
              <option value={opt} key={index}>
               <options className='option-text'>  {opt} </options>
              </option>
            ))
          }
        </select>
      </div>
      {error && (<h5 className='error-text'>{error}</h5>)}
    </div>
  )
}

export default CustomSelector;