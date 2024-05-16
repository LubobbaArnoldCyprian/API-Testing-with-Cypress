# onafriq-assignment-api-automation

# Booking API Testing with Cypress

## Overview

This project contains automated tests for creating, retrieving, and updating bookings using a Booking API. The tests are written using [Cypress](https://www.cypress.io/), a JavaScript end-to-end testing framework. The project is structured to demonstrate the process of authenticating a user, creating a booking, retrieving the booking details, and updating the booking information.

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)
- Cypress (v9 or later)

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/LubobbaArnoldCyprian/onafriq-assignment-api-automation.git
    ```

2. Navigate to the project directory:
    ```bash
    cd booking-api-tests
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```


## Test Description

The test suite is defined in the `cypress/integration/booking.spec.js` file and includes the following test cases:

1. **Generate Token**: Authenticates the user and retrieves an authorization token.
2. **Create Booking**: Creates a new booking with a randomly generated last name.
3. **GET Booking**: Retrieves the details of the created booking.
4. **Update Booking**: Updates the booking with new details.

### Test Cases

#### Generate Token

- Sends a POST request to the `/auth` endpoint with username and password.
- Stores the received token for use in subsequent requests.

#### Create Booking

- Generates a random last name.
- Sends a POST request to the `/booking/` endpoint with the booking details.
- Verifies the response status and booking details.
- Stores the booking ID for use in subsequent requests.

#### GET Booking

- Sends a GET request to the `/booking/{bookingId}` endpoint to retrieve the booking details.
- Verifies the response status and booking details.

#### Update Booking

- Sends a PATCH request to the `/booking/{bookingId}` endpoint to update the booking details.
- Verifies the response status and updated booking details.

## Running the Tests

To run the tests, execute the following command:
```bash
npx cypress open
