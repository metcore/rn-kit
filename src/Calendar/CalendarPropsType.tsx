// CalendarPropTypes.js
import PropTypes from 'prop-types';
import Color from '../Color/Color';

export const CalendarPropTypes = {
  markedDates: PropTypes.objectOf(
    PropTypes.shape({
      selected: PropTypes.bool,
      backgroundColor: PropTypes.string,
      textColor: PropTypes.string,
      disabled: PropTypes.bool,
      dots: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          color: PropTypes.string,
        })
      ),
    })
  ),
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  disabledDays: PropTypes.objectOf(
    PropTypes.shape({
      backgroundColor: PropTypes.string,
      textColor: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  mode: PropTypes.oneOf(['single', 'range']),
  onChange: PropTypes.func.isRequired,
  selectedBackgroundColor: PropTypes.string,
  selectedTextColor: PropTypes.string,
  disabledBackgroundColor: PropTypes.string,
  disabledTextColor: PropTypes.string,
};

export const CalendarDefaultProps = {
  markedDates: {},
  disabledDates: [],
  disabledDays: {},
  minDate: null,
  maxDate: null,
  mode: 'single',
  selectedBackgroundColor: Color.primary[1000],
  selectedTextColor: Color.primary[1000],
  disabledBackgroundColor: Color.base.white100,
  disabledTextColor: Color.gray[400],
};
