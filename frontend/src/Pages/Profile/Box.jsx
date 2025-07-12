import React from "react";

const Box = ({ head, date, spec, desc, skills, score }) => {
  return (
    <div className="bg-bgd border border-line rounded-lg shadow-md p-5 w-full max-w-2xl mx-auto mb-6">
      {/* Header */}
      <h5 className="text-lg font-semibold mb-2 text-txt">{head}</h5>

      {/* Spec and Date */}
      <div className="text-sm text-txt flex justify-between mb-2">
        <i>{spec}</i>
        <i>{date}</i>
      </div>

      {/* Description */}
      <p className="text-txt text-sm mb-4">{desc}</p>

      {/* Skills */}
      {skills && (
        <>
          <p className="text-sm font-medium text-txt mb-2">
            <i>Skills Used:</i>
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="text-txt px-3 py-1 rounded-full text-xs"
              >
                {skill}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Score */}
      {score && (
        <p className="text-sm text-primary">
          <i>Grade / Percentage: {score}</i>
        </p>
      )}
    </div>
  );
};

export default Box;
