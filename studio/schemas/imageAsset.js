const imageAsset = {
  title: 'Image Asset',
  name: 'imageAsset',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      options: {
        isHighlighted: true,
      },
    },
    {
      title: 'Alternative text',
      name: 'alt',
      type: 'string',
      options: {
        isHighlighted: true,
      },
      description: 'Important for SEO and accessiblity.',
      validation: (Rule) =>
        Rule.error('You have to fill out the alternative text.').required(),
    },
  ],
}

export default imageAsset
