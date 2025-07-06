import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit'
import { Comment } from '../@types/types'
import { CommentsService } from '../services'
import { RootState } from './store'

// THUNKS
export const fetchComments = createAsyncThunk(
  'comments/fetchAll',
  async () => {
    const data = await CommentsService.getAllComments()
    return data
  }
)

export const fetchCommentsForItinerary = createAsyncThunk(
  'comments/fetchForItinerary',
  async (title: string) => {
    const data = await CommentsService.getCommentsBySource('itinerary', title)
    return data
  }
)

export const fetchCommentById = createAsyncThunk(
  'comments/fetchById',
  async (id: string) => {
    const data = await CommentsService.getCommentById(id)
    return data
  }
)

export const fetchCommentByTitle = createAsyncThunk(
  'comments/fetchByTitle',
  async (title: string) => {
    const data = await CommentsService.getCommentsBySource('title', title)
    return data
  }
)

export const addComment = createAsyncThunk(
  'comments/addOne',
  async (formData: Comment, thunkAPI) => {
    const { author, sourceType, sourceId, rating, summary, description } =
      formData

    const data = await CommentsService.addComment({
      [sourceType]: sourceId,
      author,
      rating,
      summary,
      description,
    })
    return data
  }
)

// Define a type for the slice state
interface CommentsSlice {
  loading: 'idle' | 'pending' | 'done' | 'failed'
  status: string | undefined
  results: string
  data: Comment[]
}

// Define the initial state using that type
const initialState: CommentsSlice = {
  loading: 'idle',
  status: '',
  results: '',
  data: [],
}

// SLICE
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<Comment>) {
      state.data.unshift(action.payload)
    },
    deleteComment(state, action) {
      state.data.filter((comment, i) => i !== action.payload.index)
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchComments.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = 'done'
      state.data = action.payload
    })
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(fetchCommentsForItinerary.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchCommentsForItinerary.fulfilled, (state, action) => {
      state.loading = 'done'
      state.data = action.payload
    })
    builder.addCase(fetchCommentsForItinerary.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(fetchCommentById.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchCommentById.fulfilled, (state, action) => {
      state.loading = 'done'
      state.data = action.payload
    })
    builder.addCase(fetchCommentById.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(fetchCommentByTitle.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchCommentByTitle.fulfilled, (state, action) => {
      state.loading = 'done'
      state.data = action.payload
    })
    builder.addCase(fetchCommentByTitle.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
    builder.addCase(addComment.pending, (state, action) => {
      state.loading = 'pending'
    })
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = 'done'
      state.data.unshift(action.payload.data.data)
    })
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = 'failed'
      state.status = action.error.message
    })
  },
})

// SELECTORS
export const selectAllComments = (state: RootState) => state.comments.data

export const selectCommentsLoading = (state: RootState) =>
  state.comments.loading

export const selectCommentsForCity = createSelector(
  [selectAllComments, (state, city) => city],
  (comments: Comment[], city) =>
    comments && city ? comments.filter((comment: Comment) => comment.city === city) : []
)

export const selectCommentsForItinerary = createSelector(
  [selectAllComments, (state, itinerary) => itinerary],
  (comments: Comment[], itinerary) =>
    comments && itinerary
      ? comments.filter((comment: Comment) => comment.itinerary === itinerary)
      : []
)

export const selectCommentById = createSelector(
  [selectAllComments, (state, id) => id],
  (comments: Comment[], id) =>
    comments && id ? comments.filter((comment: Comment) => comment._id === id) : []
)

export const selectCommentsByUserId = createSelector(
  [selectAllComments, (state, userId) => userId],
  (comments: Comment[], userId) =>
    comments && userId
      ? comments.filter((comment: Comment) => comment.author === userId)
      : []
)

// Extract and export each action creator by name
export const { deleteComment } = commentsSlice.actions

// // Export the reducer as a default export
export default commentsSlice.reducer
