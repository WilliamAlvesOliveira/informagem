'use strict'

export function search(posts, query) {

    if (!query) return posts;

    const regEx = new RegExp(`(${query})`, 'gi');
    let hasMatch = false;

    const highlightedPosts = posts.map(post => {

        const newPost = { 
            ...post, 
            author: { ...post.author }, 
            content: post.content.map(item => ({ ...item })) 
        };

        if (regEx.test(post.title)) {
            newPost.title = post.title.replace(regEx, '<mark>$1</mark>');
            hasMatch = true;
        }

        if (regEx.test(post.author.name)) {
            newPost.author.name = post.author.name.replace(regEx, '<mark>$1</mark>');
            hasMatch = true;
        }

        newPost.content = newPost.content.map(item => {
            if (item.type === 'text' || item.type === 'subtitle') {
                if (regEx.test(item.value)) {
                    item.value = item.value.replace(regEx, '<mark>$1</mark>');
                    hasMatch = true;
                }
            }
            return item;
        });

        if (post.tags.some(tag => regEx.test(tag))) {
            hasMatch = true;
        }

        return newPost;
    });

    if (!hasMatch) return posts;

    return highlightedPosts;
}
