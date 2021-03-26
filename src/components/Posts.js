import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2 className='loading'>Loading...</h2>;
  }

  return (
    <div className="posts">
        {posts.map((post, index) => {
          return (
            <div className='post' key={index}>
              <span className='post__index'>post {post.id}</span>
              <h2 className='post__title'>{post.title}</h2>
              <p className='post__body'>{post.body}</p>
            </div>
          );
        })}
      </div>
  );
};

export default Posts;
