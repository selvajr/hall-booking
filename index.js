const express = require("express");
const { format } = require("date-fns");
const app = express();
const rooms = [
  {
    id: 1,
    name: "room1",
    amenities: ["Tv", "AC"],
    seats: 5,
    price_per_hour: 500,
  },
  {
    id: 2,
    name: "room2",
    amenities: ["Tv", "AC", "laptop"],
    seats: 6,
    price_per_hour: 750,
  },
  {
    id: 3,
    name: "room3",
    amenities: ["Tv", "AC", "food"],
    seats: 3,
    price_per_hour: 650,
  },
];
const booking = [];

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).send(`<body>
    <h1 style="text-align: center; background-color: black; color: aqua">
      Wellcome AK Hall Booking site
    </h1>

    <div>
      <h3>
        <span style="background-color: black; color: yellow">POST </span>&nbsp;
        Creating a Room endpoint:
        <a
          href="/createroom"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/createroom</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: yellow">POST </span>&nbsp;
        Booking a Room endpoint:
        <a
          href="/bookingroom"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/bookingroom</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: green">GET </span>&nbsp; List all
        Rooms endpoint:
        <a
          href="/allroomdetails"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/allroomdetails</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: green">GET </span>&nbsp;
        List all customers endpoint:
        <a
          href="/customers"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/customers</a
        >
      </h3>
      <h3>
        <span style="background-color: black; color: green">GET</span>&nbsp;
        List how many times a customer has booked the room endpoint:
        <a
          href="/customers/:customer"
          style="
            all: unset;
            cursor: pointer;
            background-color: black;
            color: aqua;
          "
          >/customers/:customer</a
        >
      </h3>
    </div>
  </body>`);
});

const generateId = (type) => {
  if (type == "room") {
    if (rooms.length == 0) return 1;
    else return rooms[rooms.length - 1].id + 1;
  } else if (type == "booking") {
    if (booking.length == 0) return 1;
    else return booking[booking.length - 1].id + 1;
  }
};

// Creating a Room

app.post("/createroom", (request, response) => {
  let id = generateId("room");
  let newRoom = { id: id, ...request.body };
  rooms.push(newRoom);
  response.json({ status: "Room created successfully", details: newRoom });
});

// Booking a Room
app.post("/bookingroom", (request, response) => {
  let id = generateId("booking");
  const room = rooms.find((data) => data.id == request.body.roomId);
  const status = booking.find((data) => data.roomId == request.body.roomId);
  let currentDate = format(new Date(), "dd-MM-yyyy-HH-mm-SS");
  if (room) {
    if (booking.length == 0 || !status) {
      let newBooking = {
        id: id,
        bookedStatus: true,
        bookingDate: currentDate,
        ...request.body,
      };
      booking.push(newBooking);
      response.json({
        status: "Room booked successfully",
        details: newBooking,
      });
    } else {
      response.json({
        status: "Room booking failed",
        details: "The given room is allready booked",
      });
    }
  } else {
    response.json({
      status: "Room booking failed",
      details: "The given room id is not found",
    });
  }
});

// List all Rooms
app.get("/allroomdetails", (request, response) => {
  const data = booking.map((data) => {
    const { name } = rooms.find((room) => room.id === data.roomId);

    return {
      roomName: name,
      bookedStatus: data.bookedStatus,
      customerName: data.customerName,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    };
  });
  response.json(data);
});

// List all customers
app.get("/customers", (request, response) => {
  const customer = booking.map((data) => {
    const { name } = rooms.find((room) => room.id === data.roomId);
    return {
      customerName: data.customerName,
      roomName: name,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
    };
  });

  response.json(customer);
});

// List how many times a customer has booked the room
app.get("/customers/:customer", (request, response) => {
  const customer = request.params.customer;
  const data = booking.map((data) => {
    const { name } = rooms.find((room) => room.id === data.roomId);
    return {
      customerName: data.customerName,
      roomName: name,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      bookingId: data.id,
      bookingDate: data.bookingDate,
      bookingStatus: data.status,
    };
  });
  const responseData = data.filter(
    (booking) => booking.customerName === customer
  );

  if (responseData.length === 0)
    return response.send({
      message: `No customer in this name ${customer}`,
      count: 0,
    });
  return response.send({
    status: "success",
    bookingCount: responseData.length,
    details: responseData,
  });
});

app.listen(4444, () => {
  console.log(`Server is running on http://localhost:4444`);
});
