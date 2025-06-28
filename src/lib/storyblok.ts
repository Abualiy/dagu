// lib/storyblok.ts
import StoryblokClient from 'storyblok-js-client';
import { storyblokInit, apiPlugin } from '@storyblok/react';

const storyblokApi = new StoryblokClient({
  accessToken: process.env.STORYBLOK_MANAGEMENT_TOKEN, // for POST/PUT/DELETE
  // oauthToken: process.env.STORYBLOK_OAUTH_TOKEN, // if needed for future
});

const storyblokDelivery = new StoryblokClient({
  accessToken: process.env.STORYBLOK_PREVIEW_TOKEN, // for fetching content
});


storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
});


export { storyblokApi, storyblokDelivery };
