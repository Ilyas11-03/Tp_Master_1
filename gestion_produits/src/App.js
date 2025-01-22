import React, { createContext, useState, useContext } from 'react';
import ProductList from './components/Products';
import ProductSearch from './components/ProductsSearch';
import ThemeToggle from './components/ThemeToggle';

// TODO: Exercice 2.1 - Créer le LanguageContext
export const LanguageContext = createContext()

export const ThemeContext = createContext();

// Créer le fournisseur de contexte
const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('fr')

  //Fonction pour changer la langue
  const changeLangue = (lang) => {
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
      next: 'Suivant',
      page: 'Page',
      of: 'sur',
    },
    en: {
      searchPlaceholder: 'Search for a product...',
      loading: 'Loading...',
      error: 'Error',
      reload: 'Reload products',
      previous: 'Previous',
      next: 'Next',
      page: 'Page',
      of: 'of',
    }
  };
 // Valeur du contexte
  const contextValue = {
    language,
    changeLangue,
    translate: (key) => translations[language][key] || key,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
};


const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // TODO: Exercice 2.2 - Ajouter l'état pour la langue

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      {/* TODO: Exercice 2.1 - Wrapper avec LanguageContext.Provider */}
      <LanguageProvider>
      <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
        <header className="my-4">
          <h1 className="text-center">Catalogue de Produits</h1>
          <div className="d-flex justify-content-end gap-2">
            <ThemeToggle />
               {/* Sélecteur de langue */}
               <LanguageSelector />
          </div>
        </header>
        <main>
          <ProductSearch />
          <ProductList />
        </main>
      </div>
      </LanguageProvider>
    </ThemeContext.Provider>
  );
};

  {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
// Composant pour le sélecteur de langue
const LanguageSelector = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="form-select"
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
};

export default App