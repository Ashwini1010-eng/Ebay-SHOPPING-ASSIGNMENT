const apiTestData = {
  baseURL: 'https://petstore.swagger.io/v2',
  category: { id: 1, name: 'test' },
  photoUrls: ['https://example.com/photo.jpg'],
  tags: [{ id: 1, name: 'tag1' }],
  status: 'available',
  createPetPayload(id: number, name: string) {
    return {
      id,
      category: this.category,
      name,
      photoUrls: this.photoUrls,
      tags: this.tags,
      status: this.status
    };
  },
  createPetName(id: number) {
    return `test-pet-${id}`;
  },
  updatedNameSuffix: '-updated'
};

export default apiTestData;
