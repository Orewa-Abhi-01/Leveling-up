const PlayerSetupModal = ({ 
    playerName, 
    setPlayerName, 
    handleNameSubmit, 
    isSubmitted 
  }) => (
    <div className="modall text-center border border-[#071B5B] rounded-xl shadow-lg bg-black/90 p-8">
      <div className="text-white text-2xl flex flex-col justify-evenly items-center">
        <h2 className="title text-4xl mb-6">Create Your Player</h2>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          className="player-name-input p-2 rounded bg-gray-800 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          className="cursor-pointer bg-cyan-400 text-black rounded-md transition hover:bg-blue-300 accept mt-4"
          onClick={handleNameSubmit}
          disabled={isSubmitted}
        >
          {isSubmitted ? "Processing..." : "Submit"}
        </button>
      </div>
    </div>
  );

  export default PlayerSetupModal