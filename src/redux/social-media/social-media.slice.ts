import { createSlice } from '@reduxjs/toolkit';

interface ISocialMedia {
  fetchPosts: boolean;
  fetchComments: boolean;
  commmentContent: string;
  selectedPostId: string;
  commentId: string;
}

const initialState: ISocialMedia = {
  fetchPosts: false,
  fetchComments: false,
  commmentContent: '',
  selectedPostId: '',
  commentId: ''
};

const socialMediaSlice = createSlice({
  name: 'social-media',
  initialState,
  reducers: {
    setFetchPosts: (state) => {
      state.fetchPosts = !state.fetchPosts;
    },
    setFetchComments: (state) => {
      state.fetchComments = !state.fetchComments;
    },
    setCommentContent: (state, { payload }) => {
      state.commmentContent = payload;
    },
    setSelectedPostId: (state, { payload }) => {
      state.selectedPostId = payload;
    },
    setCommentId: (state, { payload }) => {
      state.commentId = payload;
    },
  },
});

export const {
  setFetchPosts,
  setFetchComments,
  setCommentContent,
  setSelectedPostId,
  setCommentId
} = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
