
// const Modal = ({ title, children, buttons, isVisible, onClose }) => {
//     if (!isVisible) return null;
  
//     return (
//       <div className="modall text-center border border-[#071B5B] rounded-xl shadow-lg bg-black/40 p-8">
//         <div className="text-white text-2xl flex flex-col justify-evenly items-center">
//           <h2 className="title text-4xl mb-6">{title}</h2>
//           <div>{children}</div>
//           <div className="btn-container flex justify-center gap-4">{buttons}</div>
//         </div>
//       </div>
//     );
//   };
//   export default Modal;
  

import React from "react";

const Modal = ({ handleAccept, setShowModal }) => (
    <div className="modall absolute text-center text-cyan-400 border border-[#071B5B] rounded-lg shadow-lg bg-black/90">
      <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg animate-pulse -z-10" />
      <h2 className="title text-[3rem] font-bold border-b">NOTIFICATION</h2>
      <p className="message text-2xl flex-wrap">
        You have acquired the qualifications to be a{" "}
        <span className="highlight italic text-blue-300">Player</span>. Will you accept?
      </p>
      <div className="btn-container flex justify-center gap-4">
        <button
          className="accept cursor-pointer bg-cyan-400 text-black rounded-md transition hover:bg-blue-300"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="delete text-cyan-400 border border-cyan-400 rounded-md transition hover:bg-cyan-400 hover:text-black"
          onClick={() => setShowModal(false)}
        >
          Decline
        </button>
      </div>
      {/* <WavyBackground /> */}
    </div>
  );

  export default Modal