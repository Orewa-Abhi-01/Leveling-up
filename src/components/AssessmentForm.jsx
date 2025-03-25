import { useState } from "react";

function AssessmentForm({ onSubmit }) {
    const [assessment, setAssessment] = useState({
      fitness: 0,
      mental: 0,
      spiritual: 0,
      skills: 0
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(assessment);
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center modall text-center border border-[#071B5B] rounded-xl shadow-lg bg-black/40 p-8">
          <h2 className="title text-3xl text-cyan-400 mb-6">Initial Assessment</h2>
          
          {Object.keys(assessment).map((category) => (
            <div key={category} className="mb-4 w-full max-w-md">
              <label className="block text-cyan-400 mb-2 capitalize">
                {category} Level (0-100):
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={assessment[category]}
                onChange={(e) => setAssessment(prev => ({
                  ...prev,
                  [category]: parseInt(e.target.value)
                }))}
                className="w-full"
              />
              <span className="text-cyan-400">{assessment[category]}</span>
            </div>
          ))}
                <button
        type="submit"
        className="cursor-pointer bg-cyan-400 text-black px-6 py-2 rounded-md transition hover:bg-blue-300 mt-4"
      >
        Complete Assessment
      </button>
    </form>
  );
}

export default AssessmentForm;