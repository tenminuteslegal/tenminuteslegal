import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentArticle: (state, action) => {
      state.currentArticle = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },
    updateArticle: (state, action) => {
      const index = state.articles.findIndex(
        (article) => article.id === action.payload.id
      );
      if (index !== -1) {
        state.articles[index] = action.payload;
      }
    },
    deleteArticle: (state, action) => {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
  },
});

// Export actions
export const {
  setArticles,
  setCurrentArticle,
  setLoading,
  setError,
  addArticle,
  updateArticle,
  deleteArticle,
} = articleSlice.actions;

// Export reducer
export default articleSlice.reducer;
