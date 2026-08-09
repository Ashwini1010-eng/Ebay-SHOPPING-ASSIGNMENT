# Shopping UI + API Automation (Playwright)

This project contains automated **UI and API tests** built using **Playwright with TypeScript**.  
It validates core shopping flows on eBay and performs CRUD operations on the Swagger Petstore API.

---

## Targets

- **UI Testing:** https://www.ebay.com  
- **API Testing:** https://petstore.swagger.io/v2  

---

## Tech Stack

- Playwright Test
- TypeScript
- Node.js

---

## Project Structure

```

tests/
├── ui/                # UI test cases
├── api/               # API test cases
verification/            # Screenshots (UI validation)
playwright.config.ts     # Playwright configuration
package.json

````

---

## Setup Instructions

Clone the repository:

```bash
git clone https://github.com/Ashwini1010-eng/Ebay-SHOPPING-ASSIGNMENT.git
cd Ebay-SHOPPING-ASSIGNMENT
````

Install dependencies:

```bash
npm install
npx playwright install
```

---

## Running Tests

### Run all tests

```bash
npm test
```

### Run UI tests only

```bash
npm run test:ui
```

### Run API tests only

```bash
npm run test:api
```

---

## Test Reports

After execution, view the HTML report:

```bash
npx playwright show-report
```

---

## UI Test Coverage

* Validate eBay homepage
* Category navigation
* Product search functionality
* Screenshot capture for verification

---

## API Test Coverage (Petstore)

**File:** `tests/api/petstore.api.spec.ts`

### CRUD Flow:

* **Create:** `POST /pet`

  * Generates dynamic test data using `Date.now()`
  * Validates successful creation

* **Read:** `GET /pet/{id}`

  * Verifies created pet details

* **Update:** `PUT /pet`

  * Updates pet name and validates response

* **Delete:** `DELETE /pet/{id}`

  * Confirms deletion with `404` validation

---

## Key Design Decisions

* Tests run in **serial mode** to maintain CRUD sequence
* Dynamic test data avoids conflicts
* Isolated API contexts using `request.newContext()`
* Clear separation of UI and API tests

---

## Screenshots

UI screenshots are stored in:

```
verification/
```

---

## Ignored Files

The following are excluded via `.gitignore`:

```
node_modules/
playwright-report/
test-results/
```

---

## Author

Ashwini

```
