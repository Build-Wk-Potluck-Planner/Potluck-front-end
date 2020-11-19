// import React from "react";
// import { useHistory, Link } from "react-router-dom";
// import axiosWithAuth from "../../utils/axiosWithAuth";
// import { H3, Button, Paragraph } from "../../styles";

// const AttendeeDetails = ({ attendee }) => {
//   const history = useHistory();

//   const removeAttendee = (attendee) => {
//     axiosWithAuth()
//       .delete(`/attendees/attendee/${attendee.id}`)
//       .then(() => {
//         history.push("/reload");
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <div className="attendee-details">
//       <H3>{event.name}</H3>
//       <Paragraph>{attendee.name}</Paragraph>
//       <Paragraph>{attendee.foodname}</Paragraph>
//       <Link to={`/edit-attendee/${attendee.id}`} />
//       <Button
//         onClick={() => {
//           removeAttendee(attendee);
//         }}
//       >
//         Delete
//       </Button>
//     </div>
//   );
// };

// export default AttendeeDetails;
