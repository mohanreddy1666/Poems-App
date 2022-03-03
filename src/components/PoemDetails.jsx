import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

export default function DetailView({ data }) {
  const currentlyAFavorite = <FontAwesomeIcon icon={faHeart} />;
  const notCurrentlyAFavorite = <FontAwesomeIcon icon={faHeartBroken} />;
  const [fav, setFav] = useState(false);
  const addFavorite = (author, title) => {
    let event = [];
    const storage = window.localStorage.getItem('fav');

    if (storage) {
      event = JSON.parse(storage);
      let index = event.indexOf(title);
      console.log('index', index);
      if (index !== -1) {
        setFav(false);
        event.splice(index, 1);
        window.localStorage.setItem('fav', JSON.stringify(event));
      } else {
        event.push(title);
        setFav(true);
        window.localStorage.setItem('fav', JSON.stringify(event));
      }
    } else {
      setFav(true);
      event.push(title);
      window.localStorage.setItem('fav', JSON.stringify(event));
    }
  };
  let { poemAuthor, poemTitle } = useParams();
  const navigate = useNavigate();
  const selectedAuthor = data.find((item) => {
    const splitArray = window.location.href.split('/');
    const matchid = decodeURI(splitArray[6]);
    return matchid === item.title;
  });
  const { author, lines, title, linecount } = selectedAuthor;

  return (
    <section className='page-center'>
      <h1 className='people-heading'> {title}</h1>
      <div>
        <div className='page-content'>
          <article>
            <div className='description'>
              <div className='poem-description'>
                <p className='labels'>Author: {author}</p>
                <div className='label-box'>
                  <p className='lable-text'>{linecount} lines</p>
                  <button
                    className='favorite-button'
                    onClick={() => addFavorite(author, title)}
                  >
                    {fav === true ? currentlyAFavorite : notCurrentlyAFavorite}
                  </button>
                </div>
              </div>
              <div className='poem-line'>
                {lines.map((line, index) => {
                  return <p key={index}>{line}</p>;
                })}
              </div>

              <hr />
            </div>
          </article>
        </div>
        <div className='button-margin'>
          <button
            className='back-button'
            type='button'
            onClick={() => navigate('/home')}
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}
