const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  console.log('request /');
  res.sendFile(__dirname + '/index.html');
});

const OUTSTANDING_FEE_MSG = `{
  "data": {
    "kioskParkingGateInformationType": "OUTSTANDING_FEE",
    "kioskParkingGateInformationPayload": {
      "parking": {
        "parkingID": "ae4d5474-8853-47d9-bcd3-1309cedafab5",
        "buildingID": "ad2dfa7c-7a3d-4b76-a484-690056c97e13",
        "vehicleID": "91e71521-cd6a-4367-9a75-0b04cfd2bb5e",
        "customerID": "03ed80f5-5f0a-47f1-bde4-17349018f966",
        "parkingRefNo": "1001_220107_00001",
        "parkingGateIn": "IN-01",
        "parkingTimeIn": "2020-07-05T08:00:00+07:00",
        "parkingGateOut": null,
        "parkingTimeOut": null,
        "parkingTotalParkingTimeMinutes": null,
        "parkingStatus": "IN",
        "createdBy": null,
        "updatedBy": null,
        "createdAt": "2022-01-07T12:48:37.519675+07:00",
        "updatedAt": "2022-01-07T12:48:37.519675+07:00",
        "deletedAt": null
      },
      "payment": {
        "paymentID": "b29a4014-a52f-4ddf-81cc-9dccebd954b4",
        "parkingID": "e0f15955-167b-4633-8e4d-55514dc0be2e",
        "paymentTotalParkingMinutes": 53095,
        "paymentTotalRedemptionMinutes": 0,
        "paymentTotalParkingFeeMinutes": 53100,
        "paymentTotalParkingFeeAmount": 44250,
        "paymentTotalOvernightFeeAmount": 18500,
        "paymentTotalBuildingFreeParkingMinutes": 0,
        "paymentStatus": "READY",
        "paymentType": "MOBILE",
        "paymentSourceOfFund": "KBANK_QR_CODE",
        "paymentRefNo": "",
        "paymentRefCode": "6205e39a-5439-48af-a7cf-c67ad7c2d788",
        "paymentRefCharge": "",
        "paymentLocation": "MOBILE",
        "paymentPosID": "E030240002A0606",
        "gatewayType": "KBANK",
        "gatewayMethod": "QR_CODE",
        "createdBy": null,
        "updatedBy": null,
        "createdAt": "2022-01-14T16:06:55.860572+07:00"
      }
    },
    "kioskParkingGateInformationPayloadMetadata": {
      "payment": {
        "qrCode": "/9j/2wCEAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj==..."
      }
    }
  }
}`;

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('chat message', msg => {
    console.log(`incoming message type: ${msg}`);

    io.emit('chat message', `request message type: ${msg}`);

    if (msg === 'OUTSTANDING_FEE') {
      io.emit(`/iot/kiosk-parking-gate?buildingID=AAA&kioskParkingGateLocation=IN&kioskParkingGatePosition=01`, OUTSTANDING_FEE_MSG);
      io.emit('chat message', OUTSTANDING_FEE_MSG)
    }
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
