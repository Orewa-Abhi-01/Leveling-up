const WelcomeModal = ({ handleEnter, isEntering }) => (
    <div
      className={`modall text-center border border-[#071B5B] rounded-xl shadow-lg bg-black/90 p-8 ${
        isEntering ? "fade-out" : "fade-in"
      }`}
    >
      <div className="text-white text-2xl flex flex-col justify-evenly items-center">
        <h2 className="title text-4xl">Welcome, Hunter!</h2>
        <p className="mt-6 message">
          Join and level up yourself in this world of endless possibilities.
        </p>
        <button
          className="cursor-pointer bg-cyan-400 text-black rounded-md transition hover:bg-blue-300 accept"
          onClick={handleEnter}
        >
          Enter
        </button>
      </div>
    </div>
  );

export default WelcomeModal;