import React, {useState} from 'react';
import style from './customTooltip.module.scss';

const CustomToolTip = ({text, children}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div className={style.tooltipWrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isTooltipVisible && <div className={style.customTooltip}>{text}</div>}
    </div>
  );
};

export default CustomToolTip;