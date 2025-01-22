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