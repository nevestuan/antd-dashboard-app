import { combineReducers } from 'redux';

import userProfile from './userProfileSlice';
export * from './userProfileSlice';

export const reducer = combineReducers({
    userProfile,
});

export { default as useUserProfileService } from './useUserProfileService';
