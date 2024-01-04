import React from 'react';
import style from './form.module.scss';

const UploadFile = ({handleFileChange,selectedFile, fileError }) => {
  return (
    <div className={style.upload}>
      <input
        type='file'
        accept='image/jpeg, image/jpg'
        onChange={handleFileChange}
        style={{display: 'none'}}
        id="fileInput"/>
      <label htmlFor='fileInput'>
        <div className={style.uploadBtn}>Upload</div>
        <div className={style.uploadInput}>
          {selectedFile && selectedFile.name ? selectedFile.name : 'Upload your photo'}
        </div>
      </label>
      {fileError && <div className={style.fileError}>{fileError}</div>}
    </div>
  );
};

export default UploadFile;