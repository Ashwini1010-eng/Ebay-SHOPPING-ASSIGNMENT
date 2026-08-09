# Shopping UI + API Automation Assignment

This repository contains automated UI and API tests for a publicly accessible shopping website and the Swagger Petstore API.

## Chosen targets
- UI tests: `https://www.ebay.com`
- API tests: `https://petstore.swagger.io/v2`

## Framework
- Playwright Test (TypeScript)

## Setup
1. Open the project folder in VS Code:
   ```bash
   cd ~/shopping-assignment
   ```
2. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```

## Run tests
- Run all tests:
  ```bash
  npm test
  ```
- Run only UI tests:
  ```bash
  npm run test:ui
  ```
- Run only API tests:
  ```bash
  npm run test:api
  ```

## Screenshots
UI screenshots are saved under `verification/`.

## Notes
- The UI tests verify the eBay home page, category navigation, and search functionality.
- The API tests perform CRUD operations against the Petstore API using dynamically generated test data.

## API Tests Details

- **File:** [tests/api/petstore.api.spec.ts](tests/api/petstore.api.spec.ts#L1-L200)
- **Target:** `https://petstore.swagger.io/v2`
- **Framework:** Playwright Test using the `request` API

- **Test flow (CRUD):**
  - Create: `POST /pet` with dynamic `id` and `name` (uses `Date.now()`); asserts success and stores the returned `id`.
  - Read: `GET /pet/{id}`; asserts the returned `id` and `name` match the created resource.
  - Update: `PUT /pet` with updated `name`; asserts the response reflects the update.
  - Delete: `DELETE /pet/{id}` then `GET /pet/{id}` expects `404`.

- **Notes:**
  - Tests run in `test.describe.serial(...)` to preserve order and share `petId` between steps.
  - Each test uses `request.newContext()` for isolated HTTP contexts.
  - Test data is generated dynamically to avoid collisions.

**Run API tests**
```bash
npm run test:api
# or
npx playwright test tests/api
```

If you want, I can add JSON-schema validation for responses or convert the API tests to use a shared fixture for cleaner context handling.
