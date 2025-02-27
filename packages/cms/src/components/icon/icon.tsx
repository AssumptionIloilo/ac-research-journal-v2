import React, { FC } from 'react';

import './icon.scss';
/**
 * Displayed on the upper-right corner of the
 * admin dashboard when logged in
 */
const Icon: FC = () => {
  return (
    <div className="admin-icon">
      <img src="/assumption-logo.svg" alt="Assumption Logo" />
    </div>
  );
};

export default Icon;
