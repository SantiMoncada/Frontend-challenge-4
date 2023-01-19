import React from 'react';
export const Header = ({ children }) => {
  return (
    <div className="landbot-header">
      <h1 className="subtitle">{children}</h1>
    </div>
  );
};
