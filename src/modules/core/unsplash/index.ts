import { createApi } from 'unsplash-js';

const unsplash = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
});

export default unsplash;
