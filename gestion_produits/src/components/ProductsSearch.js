import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import useDebounce from '../hook/useDebonce';
import {LanguageContext } from './LanguageContext';

const ProductSearch = () => {
    
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  
  
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  //Utilisation useContext pour la traduction
  const {translate} = useContext(LanguageContext)
  
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  //On a appellé le hook useDebounce et useEffect
  const debouncedSearchItem = useDebounce(searchTerm, 500)
  useEffect(() => {

    console.log('Rechercher:', debouncedSearchTerm);
  },debouncedSearchItem)

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={translate('searchPlaceholder')} // Utilisation de la traduction
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;