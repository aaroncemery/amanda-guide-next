const textAndImageSection = {
  title: 'Text and Image Section',
  name: 'textAndImageSection',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Body',
      name: 'body',
      type: 'textSection',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageAsset',
    },
  ],
}

export default textAndImageSection
