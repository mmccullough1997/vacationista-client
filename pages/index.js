/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CompactArticleCard from '../components/articles/CompactArticleCard';
import CompactHighlightCard from '../components/highlights/CompactHighlightCard';
import { useAuth } from '../utils/context/authContext';
import { getAllArticles } from '../utils/data/articleData';
import getAutocompleteRecommendations from '../utils/data/autocompleteData';
import { getHighlightIdArray, getSingleDestinationHighlight } from '../utils/data/destinationHighlightData';
import getRecommendations from '../utils/data/recommendationData';

function Home() {
  const { user } = useAuth();
  const [destinationHighlight, setDestinationHighlight] = useState({});
  const [articles, setArticles] = useState([]);
  const router = useRouter();

  const getRandomDestinationHighlight = () => {
    getHighlightIdArray().then((idArray) => {
      getSingleDestinationHighlight(idArray[Math.floor(Math.random() * idArray.length)]).then(setDestinationHighlight);
    });
  };

  const getArticles = () => {
    getAllArticles().then(setArticles);
  };

  // User is signed in
  if (user) {
    useEffect(() => {
      getRecommendations('spain').then((resp) => console.warn('yelp recommendations:', resp));
      getAutocompleteRecommendations('spa').then((resp) => console.warn('autocomplete recommendations:', resp));
      getRandomDestinationHighlight();
      getArticles();
    }, [user, router]);

    return (
      <>
        <CompactHighlightCard id={destinationHighlight?.id} title={destinationHighlight?.title} content={destinationHighlight?.content} thumbnail={destinationHighlight?.thumbnail} />
        <hr />
        <div className="homePageArticles">
          {articles.map((theArticle) => (
            <CompactArticleCard id={theArticle.id} title={theArticle.title} thumbnail={theArticle.thumbnail} />
          ))}
        </div>
      </>
    );
  }

  // User is not signed in
  useEffect(() => {
    getRandomDestinationHighlight();
    getArticles();
  }, [user, router]);

  return (
    <>
      <CompactHighlightCard id={destinationHighlight?.id} title={destinationHighlight?.title} content={destinationHighlight?.content} thumbnail={destinationHighlight?.thumbnail} />
      <hr />
      <div className="homePageArticles">
        {articles.map((theArticle) => (
          <CompactArticleCard id={theArticle.id} title={theArticle.title} thumbnail={theArticle.thumbnail} />
        ))}
      </div>
    </>
  );
}

export default Home;
