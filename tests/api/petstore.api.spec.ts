import { test, expect } from '../../fixtures/test-fixtures';

let petId: number;
const uniqueId = Date.now();
const petName = `test-pet-${uniqueId}`;
const updatedPetName = `${petName}-updated`;

test.describe.serial('Petstore API Automation', () => {
  test('Create a Resource', async ({ apiClient, apiData }) => {
    console.log('API Step: Create a new pet resource');
    const response = await apiClient.post(`${apiData.baseURL}/pet`, {
      data: apiData.createPetPayload(uniqueId, petName)
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.name).toBe(petName);
    petId = body.id;
    console.log(`API Step: Created pet with id=${petId}`);
  });

  test('Read and Verify', async ({ apiClient, apiData }) => {
    console.log('API Step: Read the created pet resource');
    const response = await apiClient.get(`${apiData.baseURL}/pet/${petId}`);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.id).toBe(petId);
    expect(body.name).toBe(petName);
    console.log('API Step: Verified pet id and name match created resource');
  });

  test('Update a Resource', async ({ apiClient, apiData }) => {
    console.log('API Step: Update the pet name');
    const response = await apiClient.put(`${apiData.baseURL}/pet`, {
      data: apiData.createPetPayload(petId, updatedPetName)
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.name).toBe(updatedPetName);
    console.log(`API Step: Updated pet name to ${updatedPetName}`);
  });

  test('Delete and Confirm', async ({ apiClient, apiData }) => {
    console.log('API Step: Delete the pet resource');
    const deleteResponse = await apiClient.delete(`${apiData.baseURL}/pet/${petId}`);

    expect(deleteResponse.ok()).toBeTruthy();
    console.log('API Step: Confirm deletion by attempting to read the deleted pet');

    const getResponse = await apiClient.get(`${apiData.baseURL}/pet/${petId}`);
    expect(getResponse.status()).toBe(404);
    console.log('API Step: Confirmed pet resource deletion with 404 status');
  });
});
