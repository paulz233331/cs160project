'use strict';
const app = require('./../app');
require('dotenv').config();
var request = require('supertest');

describe("Testing with Jest", () => {

  test("Authentication Environment", () => {

    var expectedName;
    expect(process.env.ISSUER_BASE_URL).toEqual("https://cs160.us.auth0.com");
    expect(process.env.BASE_URL).toEqual("http://localhost:3000");
    expect(process.env.CLIENT_ID).toEqual("G5jX8KdS6gbXTnmS99dNLZjjhrEyp6tF");
    expect(process.env.SECRET).toEqual("dslkajflrasjfdklajsdjfl;asjdlfkjasldjkfjifugoifgiudfgdnfgldfjgldfj");
  });


  test("User Registration", () => {
        request(app).get('/').expect(200).then( (response) => {
                                    expect(response.text).toEqual("Logged Out");
                                    });
        request(app).get('/profile').set('Cookie', "appSession=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwiaWF0IjoxNjI0NTk1MjQ5LCJ1YXQiOjE2MjQ1OTUyNjMsImV4cCI6MTYyNDY4MTY2M30..qoVcnfHEuRqUFmFf.WA7cPdUQ2Ym7GvSwHJ3LU-XOLqihe_t6vs_t0SHC4a1gBnhvF5r2T0tI4CQn8e9siCbOA41080ptTeu6fs_eUTKjbu_F_LqD0iKFtRNVmX4YtI4Jj4zEGgEpH7mIXIdIJLQEAzfykVpgw9lnZfH0iUccog9F2ijKV6iekumCSWSybIl_6qnYPrq6RMhaKOz-9vM4zczJcnSZPVCaOLIj1hFbXEvYD1VLuAeDKw4m94frha9fEgVNq0z5Cls8UGyWw2a-iC-uI23oGGIKw408zfwnxZl249F1RThGugJOTg-D-6JGPIj6aCXMlyBP9xD7jkVpYcmEsvvIDHeOR4APDSrxEnJVOlz4ChKIiLweMaDh9tphMrPPkezR5HWiG4ke7kR7SUSoO2TNFbBes8v00iwIzQ5CD-g0ZOqW_9dfHXQRIfE89HCVGJtXR65PX4AbUnp2sz9Ifki34UJqCJ0hMsjaXo_ceSvll9aW245wsWenrkbSkr6gDT_H7BIRcXs1tplWhpPjpCSp3ZCvLFfbbm6D6ooWVNs9VDSFESN10UqFQSPfUI3NNHbP98nnDDmXhqjuhvIFAFbF5Ix2aUcVWiIn64bzBrXdGwED_ImWEfCFwsS5VKSIbfiH413Xwa42gVz9cA1lV5SMVrteYWQOrJXMc93uWKwckBxXTyWuPUUefRLuRIYyj4WWxxgDHZJsMY0vYH-KwHtBR-hQpiSWcg_mz-GCGSCflvVgL7HdhtWw5d9Bw6_exwIRzlq5Kfj8-rkrxC6aCnak7Y18JIyAAiKqBnqw_xe7TtGqXEi2IfVbbWkeSKuRFg2LZgZqASmll1asE5-KC2ydGCPufWBiPsri4vanDuhTarnKYNJibaWm6wunXZqjTsvzZAd1wCRS9lMK1q3g9Oa0LKPlVQqXoAMOYuK5LZs5UkdfmreaW6gXpggMHvemclcvbHmgeSShpGfNf4HoBHvPlo1C9vANFgsPXNBLe_DcLahcbR72zZOjXpHbSpZiY_K6keEn0PAHUrzegIpiEEQKjlOtpvaAJeca_wGIb9fvCzxdzHA6v030MuuFCkvxlyESO0dcug1B75B1Jps-iSuKSaGMqjlZoSo1au3SD60tCyo3XkfjIRY-eqrY-9ZLXDpnQHMlPmSEKcVWgCNXejkGGL4gRV55nvzZrGUTp08eM7YP6blbpYd01X8euy2tyKDTpXozr0s4nvZUrFqz61iI5Y4WqH9IYXcQyNHr2cqchSnBBkLXWIIOxVj2zPjGOJ_6B4y-LH8u3Xt3X8_zKaFhxLxTq6O_ivXEszOOQ5Ugm0eWZpvWy-Nhyni_3T3riLrpmsXFjuRYiI_QYsTcxSXz7dyiLtRAMWKbQNBJ-2WfUe30csNsIEmrUwF0A3aY8n-JxarpY6weA1Y8alqNqORekUblf1X8a5kZaVA8zVZ9R_8u2clGKhG42jNUYyOBYQlJdnO4HtxfR9aL2oicX3Kf9xDcuaPY9oaSVK4KaDfZbXUZMRG50iQ4VyGKx-19lduwh1ef.BptfYCMZmwu_UtTFY2ctGA" ).expect(200).then( (response) => {
                                      expect(response.text).toEqual("{\"nickname\":\"paulzsample\",\"name\":\"paulzsample@gmail.com\",\"picture\":\"https://s.gravatar.com/avatar/3ce8b63e6b78df97a8b423df9db04911?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png\",\"updated_at\":\"2021-06-25T03:09:44.782Z\",\"email\":\"paulzsample@gmail.com\",\"email_verified\":false,\"sub\":\"auth0|60d523fd03a6ea0070158b44\"}");
                                    });

  });

});