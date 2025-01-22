import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
//Regarde dans le fichier ProductsSearch.js
// TODO: Exercice 3.2 - Créer le hook useLocalStorage
//Regarde dans le fichier useLocalStorage.js

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
        const response = await fetch('https://api.daaif.net/products?delay=1000');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
        //Pagination
        setTotalPages(data.totalPages)
        setCurrentPage(page)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 
  // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination
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
  

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
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
  
   // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  return { 
    products, 
    loading, 
    error,
    reloadProducts, // Retourner la fonction
    currentPage, // Retourner l'état
    nextPage, // Retourner la fonction
    previousPage, // Retourner la fonction
  };
 


};

export default useProductSearch;