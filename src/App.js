import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App(){
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 20;
  const URL = 'https://jsonplaceholder.typicode.com/posts'

  useEffect(() => {
    if (fetching) {
      console.log('fetch')
      axios.get(`${URL}?_limit=${limit}&_page=${currentPage}`)
      .then(response => {
        setPosts([...posts, ...response.data]) 
        setCurrentPage(prevState => prevState +1)
        setTotalCount(response.headers['x-total-count'])

        console.log(`страница ${currentPage}`)
        console.log(setCurrentPage)
      })
      .finally(() => setFetching(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    const scrollHandler = (e) => {
      if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 
        && posts.length < totalCount) {
        setFetching(true)
      }
    }

    return (
      <div className="App">
        <div className="posts">
          {posts && posts.map((post, index) => {
            return (
              <div className="post" key={index}>
                <span className="post__index">post {index + 1}</span>
                <h2 className="post__title">{post.title}</h2>
                <p className="post__body">{post.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default App;
