// import Home from "@mui/icons-material/Home";
// import React, { useState } from "react";
// import { getMovie } from "../../reduxStore/slices/movieSlice";

// const Navbar = () => {
//   const [query, setQuery] = useState();
//   const handlekeyEnter = (event) => {
//     if (event.key == "Enter") {
//       event.preventDefault();
//       console.log("hellloeoeo");
//       if (query) {
//         getMovie(searchurl, currentPage,query);
//       } else {
//         getMovie(Apiurl, currentPage);
//       }
//     }
//   };
//   return (
//     <div>
//       <div className="navbar-container">
//         <nav class="navbar navbar-expand-lg navbar-light">
//           <div class="container-fluid">
//             <form class="d-flex">
//               <input
//                 class="form-control me-2"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//                 // value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 onKeyDown={handlekeyEnter}
//               />
//               <button class="btn btn-outline-success" type="submit">
//                 Search
//               </button>
//             </form>

//             <Home style={{ color: "white" }} />
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
