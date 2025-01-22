  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  //On a appellé le hook useDebounce et useEffect
  const debouncedSearchItem = useDebounce(searchTerm, 500)
  useEffect(() => {

    console.log('Rechercher:', debouncedSearchTerm);
  },debouncedSearchItem)


  // TODO: Exercice 2.1 - Utiliser le LanguageContext
   1-On a crée un composant "LanguageContext" qui gère la traduction en utilisant "createContext"
   //Le composant qui gère la traduction en utilisant le context
import React, {createContext, useState} from "react";

//Créer le contexte
export const LanguageContext = createContext();

//Créer le fournisseur de contexte
export const LanguageProvider = ({children}) => {

    const [language, setLanguage] = useState('fr') //Par Défaut en français

    //Fonction pour changer la langue
    const changeLanguage = (lang) => {
        setLanguage(lang)
    }

    //Traduction 
    const translations = {
        fr: {
            searchPlaceholder: 'Rechercher un produit...',
            loading: 'Chargement...',
            error: 'Erreur',
            reload: 'Recharger les produits',
            previous: 'Précédent',
            next: 'Suivant'
        },
        en: {
            searchPlaceholder: 'Search for a product...',
            loading: 'Loading...',
            error: 'Error',
            reload: 'Reload products',
            previous: 'Previous',
            next: 'Next',
        }
    }

    //valeur de contexte
    const contextValue = {
        language,
        changeLanguage,
        translate: (key) => translations[language][key] || key, //Fonction de traduction
    }

    return (
        <LanguageContext.Provider value={contextValue}>
        {children}
        </LanguageContext.Provider>
    )

}
2-Après on va utiliser useContext pour la traduction dans le fichier "ProductsSearch.js"
  const {translate} = useContext(LanguageContext)

//TODO: 3.1- Créer le hook useDebonce :

  import { useState, useEffect } from "react";
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {

        const handler = setTimeout(() =>{
            setDebouncedValue(value)
        }, delay)

        return () => {
          clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue;
}
export default useDebounce;

//TODO:  3.2 - Créer le hook useLocalStorage
//Le hook useLocalStorage permet de synchroniser un état avec le localStorage

import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error)
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(error)
        }
    };
    return [storedValue, setValue];
}
export default useLocalStorage;

-Exemple d'utilisation :
const [theme, setTheme] = useLocalStorage('theme', 'light');

//TODO:  4.1 - Ajouter la fonction de rechargement
 const reloadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.daaif.net/products?delay=1000');
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  Dans ProductList, on a ajouté un bouton pour recharger les produits :
  <button onClick={reloadProducts} className="btn btn-primary my-3">
  Recharger les produits
</button>

//TODO:  4.2 - Ajouter la pagination
1-Ajouter l'état pour la pagination
 const [currentPage, setCurrentPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)

 2-Ajouter les dépendances pour la pagination
  useEffect(() => {
    fetchProducts(currentPage)
  }, [currentPage])

const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
Dans "ProductList", on va ajouter les contrôles de pagination :
<nav className="mt-4">
  <ul className="pagination justify-content-center">
    <li className="page-item">
      <button className="page-link" onClick={previousPage}>
        Précédent
      </button>
    </li>
    <li className="page-item">
      <span className="page-link">
        Page {currentPage} sur {totalPages}
      </span>
    </li>
    <li className="page-item">
      <button className="page-link" onClick={nextPage}>
        Suivant
      </button>
    </li>
  </ul>
</nav>
  
