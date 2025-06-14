import React from 'react';

export interface SelectProps {
  isOpen?: boolean;
  multiple?: boolean;
  renderItem?: React.ReactNode;
  onSubmit?: (val) => void;
  onClose?: (val) => void;
  onSearch: (val) => void;
  required?: boolean;
}
