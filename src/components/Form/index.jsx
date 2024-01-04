import React, {useEffect, useState} from 'react';
import {NotificationManager} from 'react-notifications';
import {useUserContext} from "../UserProvider";
import SelectPosition from "./SelectPosition";
import Button from "../Button";
import UploadFile from "./UploadFile";
import InputForm from "./InputForm";
import successImage from '../../assets/images/success-image.svg';
import style from './form.module.scss';
import {
  handleChange,
  validateEmail,
  validateName,
  validatePhone,
  validatePositionId
} from "../../helpers/validationUtils";

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const {setUsers, setShouldUpdateUsers, setPage} = useUserContext();


  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [positionIdError, setPositionIdError] = useState('');
  const [fileError, setFileError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (event) => handleChange(event, setName, setNameError, value => {
    return (value.length < 2 || value.length > 60) ? 'Name should be 2-60 characters' : '';
  });

  const handleEmailChange = (event) => handleChange(event, setEmail, setEmailError, value => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value) ? '' : 'Enter a valid email';
  });

  const handlePhoneChange = (event) => handleChange(event, setPhone, setPhoneError, value => {
    const phonePattern = /^\+380\d{9}$/;
    return phonePattern.test(value) ? '' : 'Phone should start with +380 and contain 12 digits';
  });

  const handleOptionChange = (event) => handleChange(event, setSelectedOption, setPositionIdError, value => {
    return value ? '' : 'You must select a position';
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
        setFileError('Choose an image in jpeg/jpg format.');
        return;
      }

      const img = new Image();
      img.onload = function () {
        if (img.width < 70 || img.height < 70) {
          setFileError('Minimum image size is 70x70 pixels.');
        } else if (file.size > 5 * 1024 * 1024) {
          setFileError('Image size should not exceed 5 MB.');
        } else {
          setFileError('');
          setSelectedFile(file);
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const validateForm = () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isPositionIdValid = validatePositionId(selectedOption);
    const isFileValid = selectedFile && !fileError;

    setIsFormValid(isNameValid && isEmailValid && isPhoneValid && isPositionIdValid && isFileValid);
  };

  const clearFormState = () => {
    setSuccessSubmit(true);
    setUsers([]);
    setPage(1);
    setShouldUpdateUsers(true);
    setName('');
    setEmail('');
    setPhone('');
    setSelectedOption(null);
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('position_id', selectedOption);
      formData.append('photo', selectedFile);

      const authToken = localStorage.getItem('authToken');

      try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
          method: 'POST',
          body: formData,
          headers: {
            'Token': authToken
          }
        });

        const data = await response.json();
        if (data.success === false) {
          NotificationManager.error(data.message);
        } else {
          clearFormState();
          NotificationManager.success(data.message);
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [name, email, phone, selectedOption, selectedFile]);


  return (
    <div className={style.wrapper} id='signup'>
      {successSubmit ? (
        <div className={style.success}>
          <div className={style.title}>User successfully registered</div>
          <img src={successImage} alt='success sign up'/>
        </div>
      ) : (
        <>
          <div className={style.title}>Working with POST request</div>
          <div className={style.form}>
            <div className={style.inputFormWrapper}>
              <InputForm type='text' placeholder='Your name' value={name} changeHandler={handleNameChange}
                         error={nameError}/>
              <InputForm type='email' placeholder='Email' value={email} changeHandler={handleEmailChange}
                         error={emailError}/>
              <InputForm type='tel' placeholder='Phone' value={phone} changeHandler={handlePhoneChange}
                         error={phoneError}/>
            </div>
            <SelectPosition selectedOption={selectedOption} handleOptionChange={handleOptionChange}
                            error={positionIdError}/>
            <UploadFile handleFileChange={handleFileChange} selectedFile={selectedFile} fileError={fileError}/>
          </div>
          <Button text='Sign up' isDisabled={!isFormValid} onClickHandler={handleSubmit}/>
        </>
      )}
    </div>
  );
};

export default Form;