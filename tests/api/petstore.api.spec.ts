import { test, expect, request } from '@playwright/test';

const API_BASE = 'https://petstore.swagger.io/v2';

test.describe.serial('Petstore API Automation', () => {
  let petId: number;
  const petName = `test-pet-${Date.now()}`;
  const updatedPetName = `${petName}-updated`;

  test('Create a Resource', async ({}) => {
    console.log('API Step: Create a new pet resource');
    const apiRequest = await request.newContext();
    const response = await apiRequest.post(`${API_BASE}/pet`, {
      data: {
        id: Date.now(),
        category: { id: 1, name: 'test' },
        name: petName,
        photoUrls: ['https://example.com/photo.jpg'],
        tags: [{ id: 1, name: 'tag1' }],
        status: 'available'
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.name).toBe(petName);
    petId = body.id;
    console.log(`API Step: Created pet with id=${petId}`);
  });

  test('Read and Verify', async ({}) => {
    console.log('API Step: Read the created pet resource');
    const apiRequest = await request.newContext();
    const response = await apiRequest.get(`${API_BASE}/pet/${petId}`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.id).toBe(petId);
    expect(body.name).toBe(petName);
    console.log('API Step: Verified pet id and name match created resource');
  });

  test('Update a Resource', async ({}) => {
    console.log('API Step: Update the pet name');
    const apiRequest = await request.newContext();
    const response = await apiRequest.put(`${API_BASE}/pet`, {
      data: {
        id: petId,
        category: { id: 1, name: 'test' },
        name: updatedPetName,
        photoUrls: ['https://example.com/photo.jpg'],
        tags: [{ id: 1, name: 'tag1' }],
        status: 'available'
      }
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.name).toBe(updatedPetName);
    console.log(`API Step: Updated pet name to ${updatedPetName}`);
  });

  test('Delete and Confirm', async ({}) => {
    console.log('API Step: Delete the pet resource');
    const apiRequest = await request.newContext();
    const deleteResponse = await apiRequest.delete(`${API_BASE}/pet/${petId}`);
    expect(deleteResponse.ok()).toBeTruthy();
    console.log('API Step: Confirm deletion by attempting to read the deleted pet');
    const getResponse = await apiRequest.get(`${API_BASE}/pet/${petId}`);
    expect(getResponse.status()).toBe(404);
    console.log('API Step: Confirmed pet resource deletion with 404 status');
  });
});
