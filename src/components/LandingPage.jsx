import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage({ data }) {
  const navigate = useNavigate();
  const [details, setDetails] = useState(data);
  const [sortType, setSortType] = useState('');
  const [store, setStore] = useState(false);
  const storage = JSON.parse(window.localStorage.getItem('fav'));

  useEffect(() => {
    storage ? setStore(true) : setStore(false);
    const onSorting = (option) => {
      let sortedList = [...data].sort((a, b) => {
        if (a[option] > b[option]) {
          return 1;
        } else if (a[option] < b[option]) {
          return -1;
        }
        return 0;
      });
      setDetails(sortedList);
    };
    onSorting(sortType);
    return () => setDetails(data) && setSortType('') && setStore(false);
  }, [data, sortType, store, storage]);

  const searchTitle = (title) => {
    return details.find((x) => (x.title = title));
  };

  return (
    <div className='landing-poems'>
      <div className='landing-poems-heading'>
        <h1>Poems</h1>
        <div className='fav-sort'>
          <div className='favList'>
            <h2> Favourites</h2>
            <div className='fav-list-poems'>
              {store
                ? storage.map((link, i) => {
                    searchTitle(link);
                    return (
                      <li
                        className='fav-link'
                        key={i}
                        onClick={() =>
                          navigate(
                            `/author/${searchTitle(link).author}/title/${
                              searchTitle(link).title
                            }`
                          )
                        }
                      >
                        {link}
                      </li>
                    );
                  })
                : 'No favourites'}
            </div>
          </div>
          <div className='sort-component'>
            <div className='sort-element'>
              <label className='sort-label'>Sort</label>
              <select onChange={(e) => setSortType(e.target.value)}>
                <option value='title'>Title</option>
                <option value='author'>Author</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='fav-and-poems'>
        <div className='landingPage'>
          {details.map((link, i) => {
            return (
              <div className='card' key={i}>
                <div className='card-content-description'>
                  <div className='card-content'>
                    <h5 className='card-description'>Author:</h5>
                    <span className='card-values'>{link.author}</span>
                    <hr className='hr-line' />
                    <h5 className='card-description'>Title:</h5>
                    <span className='card-values'>{link.title}</span>
                  </div>
                  <button
                    className='view-more'
                    type='button'
                    onClick={() =>
                      navigate(`/author/${link.author}/title/${link.title}`)
                    }
                  >
                    View More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='landing-page-back-button'>
        <button
          className='landing-back-button'
          type='button'
          onClick={() => navigate('/')}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
