'use strict'

export function search(posts, query) {
  if (!query) return posts;

  const regEx = new RegExp(`(${query})`, 'gi');

  return posts.map(post => {
    const newPost = { ...post };

    newPost.title = post.title.replace(regEx, '<mark>$1</mark>');

    newPost.content = post.content.map(item => {
      if (item.type === 'text' || item.type === 'subtitle') {
        return {
          ...item,
          value: item.value.replace(regEx, '<mark>$1</mark>')
        };
      }
      return item;
    });

    return newPost;
  }).filter(post => {
  
    return regEx.test(post.title) ||
           post.content.some(item => 
             (item.type === 'text' || item.type === 'subtitle') && regEx.test(item.value)
           ) ||
           post.tags.some(tag => regEx.test(tag));
  });
}
