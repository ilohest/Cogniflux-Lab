import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';
import type { SanityImageAsset } from '../types/sanity';

const builder = imageUrlBuilder(sanityClient);

export const imageUrl = (source: SanityImageAsset | string, width = 1600): string => {
  if (typeof source === 'string') {
    return source;
  }

  if (source.asset?.url) {
    return source.asset.url;
  }

  if (source.asset?._ref) {
    return builder.image(source).width(width).auto('format').quality(90).url();
  }

  return '';
};
