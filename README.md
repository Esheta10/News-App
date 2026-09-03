# Spill the Tea-V

A React news application that fetches articles from NewsAPI. Users can search for news and filter articles by category.

## Features

- Fetches a default list of news articles when the app loads
- Searches for news from the navigation bar
- Waits one second after typing before sending a search request
- Filters news by category
- Shows a loading indicator while a request is in progress
- Displays article cards with title, image, description, and a link to the full article
- Responsive layout built with Tailwind CSS and DaisyUI

## Tech Stack

- React
- Vite
- Axios
- Tailwind CSS
- DaisyUI
- NewsAPI

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add the NewsAPI key

Create a `.env` file in the `News_App` folder:

```env
VITE_API_KEY=your_newsapi_key
```

Get an API key from [NewsAPI](https://newsapi.org/). Do not commit the `.env` file to source control.

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Project Structure

```text
src/
├── components/
│   ├── Category.jsx    # Category filter buttons
│   ├── Footer.jsx      # Application footer
│   ├── Loader.jsx      # Loading indicator
│   ├── NavBar.jsx      # Search input and navigation
│   └── Wrapper.jsx     # Shared layout wrapper
├── config/
│   └── axios.js        # Axios client and NewsAPI base URL
├── context/
│   └── NewsContext.jsx  # News state and API fetching logic
├── page/
│   └── News.jsx         # News list and article cards
├── App.jsx
└── main.jsx
```

## How Data Flows

`NewsContext` owns the `news` state and the `fetchNews` function. The navigation bar and category buttons call `fetchNews` with a query. After the API response arrives, `fetchNews` stores the articles with `setNews`, and `News.jsx` re-renders the article cards.

