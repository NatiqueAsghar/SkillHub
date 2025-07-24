const Box = ({ head, date, spec, desc, skills, score }) => {
  return (
    <div className="bg-bgd rounded-lg shadow-md p-5 w-full max-w-2xl mx-auto mb-6">
      <h5 className="text-lg font-semibold mb-2 text-txt">{head}</h5>

      <div className="text-sm text-txt flex justify-between mb-2">
        <i>{spec}</i>
        <i>{date}</i>
      </div>

      <p className="text-txt text-sm mb-4">{desc}</p>

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

      {score && (
        <p className="text-sm text-txt">
          <i>Grade / Percentage: {score}</i>
        </p>
      )}
    </div>
  );
};

export default Box;
