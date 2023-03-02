import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import HeaderContext from './HeaderContext';

export default function HeaderProvider({ children }) {
  const [search, setSearch] = useState('');
  const values = useMemo(() => ({
    search,
    setSearch,
  }), [search, setSearch]);

  return (
    <HeaderContext.Provider value={ values }>
      { children }
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
