export const blogPosts = [
  {
    id: 1,
    slug: "getting-started-with-react-hooks",
    title: "Getting Started with React Hooks",
    description: "A comprehensive guide to understanding and using React Hooks for state management and side effects in your functional components.",
    author: "Jane Doe",
    authorImage: "https://placehold.co/100x100.png?text=JD",
    postImage: "https://placehold.co/600x400.png",
    date: "October 26, 2023",
    category: "Web Development",
    views: 25700,
    followers: 1200,
    content: `
      <p>React Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.</p>
      <h2>Why Hooks?</h2>
      <p>Hooks solve a wide variety of seemingly unconnected problems in React that we’ve encountered over five years of writing and maintaining tens of thousands of components. Whether you’re learning React, use it daily, or even prefer a different library with a similar component model, you might recognize some of these problems.</p>
      <pre><code class="language-javascript font-code">import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>
      <p>This new function useState is the first “Hook” we’ll learn about, but this example is just a teaser. Don’t worry if it doesn’t make sense yet!</p>
    `,
    subsections: [
      {
        title: "The State Hook",
        description: "useState is a Hook that lets you add React state to function components. We’ll learn more about it in a bit.",
        image: "https://placehold.co/600x400.png"
      },
      {
        title: "The Effect Hook",
        description: "The Effect Hook, useEffect, adds the ability to perform side effects from a function component. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.",
        image: "https://placehold.co/600x400.png"
      }
    ]
  },
  {
    id: 2,
    slug: "a-deep-dive-into-css-grid",
    title: "A Deep Dive into CSS Grid",
    description: "Explore the powerful capabilities of CSS Grid Layout and how it can revolutionize the way you create complex web layouts with ease.",
    author: "John Smith",
    authorImage: "https://placehold.co/100x100.png?text=JS",
    postImage: "https://placehold.co/600x400.png",
    date: "October 22, 2023",
    category: "Design",
    views: 18300,
    followers: 850,
    content: "<p>Content for CSS Grid post.</p>",
    subsections: []
  },
  {
    id: 3,
    slug: "mastering-asynchronous-javascript",
    title: "Mastering Asynchronous JavaScript",
    description: "From callbacks to Promises to async/await, this article covers everything you need to know about handling asynchronous operations in JavaScript.",
    author: "Emily White",
    authorImage: "https://placehold.co/100x100.png?text=EW",
    postImage: "https://placehold.co/600x400.png",
    date: "October 18, 2023",
    category: "JavaScript",
    views: 31200,
    followers: 2500,
    content: "<p>Content for Async JS post.</p>",
    subsections: []
  },
  {
    id: 4,
    slug: "the-evolution-of-web-design",
    title: "The Evolution of Web Design",
    description: "A journey through the history of web design, from static HTML pages to the dynamic, interactive experiences of today.",
    author: "Chris Green",
    authorImage: "https://placehold.co/100x100.png?text=CG",
    postImage: "https://placehold.co/600x400.png",
    date: "October 15, 2023",
    category: "Design",
    views: 9800,
    followers: 450,
    content: "<p>Content for Web Design post.</p>",
    subsections: []
  },
  {
    id: 5,
    slug: "building-your-first-nextjs-app",
    title: "Building Your First Next.js App",
    description: "A step-by-step tutorial for beginners on creating a server-rendered React application using the Next.js framework.",
    author: "Jane Doe",
    authorImage: "https://placehold.co/100x100.png?text=JD",
    postImage: "https://placehold.co/600x400.png",
    date: "October 11, 2023",
    category: "Web Development",
    views: 45000,
    followers: 1200,
    content: "<p>Content for Next.js app post.</p>",
    subsections: []
  },
  {
    id: 6,
    slug: "seo-best-practices-for-developers",
    title: "SEO Best Practices for Developers",
    description: "Learn how to improve your site's visibility on search engines with technical SEO strategies and best practices.",
    author: "Mike Brown",
    authorImage: "https://placehold.co/100x100.png?text=MB",
    postImage: "https://placehold.co/600x400.png",
    date: "October 07, 2023",
    category: "SEO",
    views: 15200,
    followers: 780,
    content: "<p>Content for SEO post.</p>",
    subsections: []
  }
];
