import React, {useEffect, useState} from 'react';
import radioChecked from '../../assets/images/radio.svg';
import radioUnchecked from '../../assets/images/radioUnchecked.svg';
import style from './form.module.scss';
import {BASE_URL} from "../../api/api";

const SelectPosition = ({selectedOption, handleOptionChange, error}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/positions`);
        const data = await response.json();
        setOptions(data.positions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  }, []);


  return (
    <>
      <div className={style.selectText}>Select your position</div>
      <div className={style.selectWrapper}>
        {options.map((option) => (
          <div className={style.option} key={option.id}>
            <input
              type="radio"
              id={`radio-${option.id}`}
              name="radioGroup"
              value={option.id}
              defaultChecked={selectedOption === option.id}
              onChange={handleOptionChange}
            />
            <label htmlFor={`radio-${option.id}`}>
              <img src={selectedOption == option.id ? radioChecked : radioUnchecked}/>
              {option.name}
            </label>
          </div>
        ))}
        {error && <div className={style.error}>{error}</div>}
      </div>
    </>
  );
};

export default SelectPosition;