import React, { useRef } from 'react';
import asField from '../../HOC/asField';
import Debug from '../../debug';
import useLayoutEffect from '../../hooks/useIsomorphicLayoutEffect';

const logger = Debug('informed:Select' + '\t');

const Select = ({ fieldApi, fieldState, ...props }) => {
  const { value } = fieldState;
  const { setTouched } = fieldApi;
  const {
    onChange,
    onBlur,
    field,
    initialValue,
    children,
    forwardedRef,
    debug,
    multiple,
    ...rest
  } = props;

  const selectRef = useRef();

  const handleChange = (e) => {

    let selected = Array.from((forwardedRef || selectRef).current)
      .filter(option => option.selected)
      .map(option => option.value);

    fieldApi.setValue(
      multiple ? selected : selected[0] || ''
    );

    if (onChange && e) {
      onChange(e);
    }
  };

  // for debugging
  useLayoutEffect(
    () => {
      if (debug && forwardedRef) {
        forwardedRef.current.style.background = 'red';
        setTimeout(() => {
          forwardedRef.current.style.background = 'white';
        }, 500);
      }
    }
  );

  logger('Render', field, value);

  return (
    <select
      {...rest}
      multiple={multiple}
      name={field}
      ref={forwardedRef || selectRef}
      value={value || (multiple ? [] : '')}
      onChange={handleChange}
      onBlur={e => {
        setTouched(true);
        if (onBlur) {
          onBlur(e);
        }
      }}>
      {children}
    </select>
  );

};

export { Select as BasicSelect };

export default asField(Select);
