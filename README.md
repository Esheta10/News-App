# Spill the Tea-V

Spill the Tea-V is a React-based news application that fetches live headlines from the NewsAPI and displays them in a modern card layout. Users can browse a default set of articles on load, search for specific news topics, and filter by categories like business, sports, technology, and health.

The app is built with Vite, React, Axios, Tailwind CSS, and DaisyUI, making it lightweight, responsive, and easy to extend.

---

## Features

- Fetches top articles automatically when the app loads
- Allows custom keyword searches from the navbar
- Adds a short debounce delay before submitting each search
- Lets users switch between predefined categories
- Shows a loading spinner while data is being fetched
- Displays article cards with title, image, description, and a direct read-more link
- Uses a clean, responsive layout for desktop and mobile screens

---

## Tech Stack

- React 19
- Vite
- JavaScript
- Axios
- Tailwind CSS
- DaisyUI
- NewsAPI

---

## Project Purpose

This project is a practical example of how to build a small frontend app that consumes a third-party REST API. It demonstrates:

- React state management with Context API
- asynchronous requests using Axios
- environment variable handling with Vite
- search and filter behavior in a UI
- reusable components and a clean separation of concerns

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a .env file

Create a file named `.env` in the root of the project and add your NewsAPI key:

```env
VITE_API_KEY=your_newsapi_key_here
```

You can get a free API key from [NewsAPI](https://newsapi.org/).

> Important: keep this file private and do not commit it to version control.

### 3. Run the app

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

---

## Available Scripts

```bash
npm run dev       # Start the local development server
npm run build     # Build the app for production
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint checks
```

---

## App Architecture

### 1. App shell
The root app component wraps the UI and renders the major sections:

- Navbar
- Category filter buttons
- News content area
- Footer

This is controlled in [src/App.jsx](src/App.jsx).

### 2. Global state with Context API
The main data logic lives in [src/context/NewsContext.jsx](src/context/NewsContext.jsx).

It creates a `NewsContext` and provides:

- `news` — current article list
- `loading` — request status
- `fetchNews` — function that calls the NewsAPI

This allows different components to access the same data without passing props through many levels.

### 3. Search and query functionality
The search input is in [src/components/NavBar.jsx](src/components/NavBar.jsx).

It uses a `setTimeout` debounce so the app does not fire a request on every keystroke. The logic works like this:

- user types in the search box
- previous timer is cleared
- after 1 second, a request is sent to the API using the entered query

### 4. Category selector
The category buttons live in [src/components/Category.jsx](src/components/Category.jsx).

Each button calls `fetchNews` with a URL like:

```js
/everything?q=business
```

This makes it easy to switch between news topics without reloading the page.

### 5. Article rendering
The actual articles are displayed in [src/page/News.jsx](src/page/News.jsx).

It maps over the `news` array and renders a card for each article with:

- image
- title
- description
- read more button

---

## Data Flow

The app follows a simple pattern:

1. The app loads and calls `fetchNews()` from `NewsContext`
2. `fetchNews` sends a GET request to the NewsAPI endpoint
3. The response is saved to the `news` state
4. The `News` component re-renders with the new article list
5. The UI updates automatically with the loaded data

In short, the data flow is:

```text
User action -> fetchNews() -> API response -> setNews() -> UI rerender
```

---

## API Configuration

The Axios client is configured in [src/config/axios.js](src/config/axios.js).

```js
const api = axios.create({
  baseURL: 'https://newsapi.org/v2',
  timeout: 10000,
})
```

This means each request can be a short relative path like:

```js
api.get(`/everything?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`)
```

The base URL points to NewsAPI, and the API key is added from the environment file.

---

## Request Format

The application uses the `everything` endpoint, which lets it search by keyword across articles.

Example requests:

```js
/everything?q=india
/everything?q=technology
/everything?q=sports
```

The final URL includes the API key, for example:

```js
https://newsapi.org/v2/everything?q=india&apiKey=YOUR_API_KEY
```

---

## Folder Structure

```text
src/
├── App.jsx
├── main.jsx
├── index.css
├── App.css
├── assets/
├── components/
│   ├── Category.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   ├── NavBar.jsx
│   └── Wrapper.jsx
├── config/
│   └── axios.js
├── context/
│   └── NewsContext.jsx
├── page/
│   └── News.jsx
└──
```

---

## How the Search Works

The search is intentionally designed to reduce unnecessary network calls.

```js
const timer = useRef(null);

const searchValue = (e) => {
  clearTimeout(timer.current);

  timer.current = setTimeout(async () => {
    const search = e.target.value;
    if (!search) return;
    await fetchNews(`/everything?q=${search}`);
  }, 1000);
};
```

This means the app waits 1 second after the user stops typing before sending the request. This pattern is called debouncing and improves performance and API efficiency.

---

## Loading State

While the API request is in process, a loading state is shown to the user:

```js
if (loading) {
  return <Loader />;
}
```

This prevents users from seeing a blank area while the request is still running.

---

## Error Handling

The app catches API errors in the context file and logs them to the console:

```js
catch (error) {
  console.log(error);
  setLoading(false);
  return [];
}
```

This is useful for debugging during development, but for a production app you would usually show a user-friendly error message instead of only logging in the console.

---

## Common Troubleshooting

### 1. 429 Too Many Requests
This usually means your NewsAPI key has hit a rate limit or is being used too frequently. The app will often log a 429 response in the browser console.

Solutions:

- wait a little before making more requests
- use a valid API key
- avoid excessive repeated search calls while typing
- check NewsAPI plan limits

### 2. Invalid API key
If the request fails with authorization errors, check the `.env` file and make sure your key is correct:

```env
VITE_API_KEY=your_actual_key
```

### 3. Empty articles list
This can happen if the search query returns no results or the API response is malformed. The app already protects against missing `articles` by using:

```js
const articles = response.data.articles ?? [];
```

### 4. Search not working
Verify that:

- the input event is connected correctly
- the debounce timer is active
- the request URL includes the query and API key

---

## Future Improvements

This project can be expanded with features like:

- pagination for news articles
- category-specific tabs with custom icons
- dark/light theme support
- local storage for saved articles
- better error messages in the UI
- sorting by date or popularity
- use of NewsAPI top-headlines endpoint for country or category-specific feeds

---

## Summary

Spill the Tea-V is a clean and beginner-friendly React project that demonstrates how to connect a frontend application to a live API, manage global state, handle loading and errors, and build a responsive news feed UI.

It is a great example of how to create a small but fully functional app with modern frontend tooling.

---


