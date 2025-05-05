export default function buyingBuddyHeadTags() {
  return [
    {
      tag: 'link',
      rel: 'preload',
      href: 'https://www.mbb2.com/version3/css/theme/acid/KNdD0yub',
      as: 'style'
    },
    {
      tag: 'link',
      rel: 'preload',
      href: 'https://d2w6u17ngtanmy.cloudfront.net/scripts/my-buying-buddy.5.0.js.gz',
      as: 'script'
    },
    {
      tag: 'link',
      rel: 'preload',
      href: 'https://maps.googleapis.com/maps/api/js?callback=mbbMapLoaded&libraries=places',
      as: 'script'
    }
  ];
}
