const dataJSON = require('../fixtures/createBooking.json');

describe("Create, GET, and Update a New Booking", () => {
    let token;
    let bookId;
    let lName;

    const headers = {
        'Content-Type': 'application/json'
    };

    before(() => {
        // Generate token
        cy.request({
            method: 'POST',
            url: '/auth',
            body: {
                username: dataJSON.usernameAuth,
                password: dataJSON.passwordAuth
            },
            headers
        }).then((response) => {
            expect(response.status).to.eq(200);
            token = response.body.token;
            cy.log("Token generated: " + token);
        });
    });

    it('Create Booking', () => {
        // Generate random last name
        const pattern = "ABCdef";
        lName = Array.from({ length: 5 }, () => pattern.charAt(Math.floor(Math.random() * pattern.length))).join('');

        cy.request({
            method: 'POST',
            url: '/booking/',
            body: {
                firstname: dataJSON.firstname,
                lastname: lName,
                totalprice: dataJSON.totalprice,
                depositpaid: true,
                bookingdates: {
                    checkin: "2024-05-16",
                    checkout: "2024-05-18"
                },
                additionalneeds: "Breakfast"
            },
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            const booking = response.body.booking;
            expect(booking).to.include({
                firstname: dataJSON.firstname,
                lastname: lName,
                totalprice: dataJSON.totalprice
            });
            bookId = response.body.bookingid;
            cy.log("Your Booking ID is: " + bookId);
        });
    });

    it('GET Booking', () => {
        cy.request({
            method: 'GET',
            url: `/booking/${bookId}`,
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.include({
                firstname: dataJSON.firstname,
                lastname: lName,
                totalprice: dataJSON.totalprice
            });
        });
    });

    it('Update Booking', () => {
        cy.request({
            method: 'PATCH',
            url: `/booking/${bookId}`,
            headers: {
                ...headers,
                Accept: 'application/json',
                Cookie: `token=${token}`
            },
            body: {
                firstname: dataJSON.updateFirstName,
                totalprice: dataJSON.updatedTotalPrice
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.include({
                firstname: dataJSON.updateFirstName,
                totalprice: dataJSON.updatedTotalPrice
            });
        });
    });
});
