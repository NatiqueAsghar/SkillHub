import { Link } from "react-router-dom";

const RequestCard = ({ picture, bio, name, skills, rating, username }) => {
  return (
    <div className="border-brd rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={picture}
          alt="user"
        />
      </div>

      <div className="text-center">
        <h3 className="text-xl text-tl font-semibold">{name}</h3>
        <h6 className="text-sm text-txt">Rating: {rating}</h6>
      </div>

      <p className="text-sm text-bgd dark:text-txt mt-2 text-center">{bio}</p>

      <div className="flex justify-center mt-4">
        <Link to={`/profile/${username}`}>
          <button className="border border-brd bg-tl hover:bg-tlh text-txt font-medium px-4 py-2 rounded">
            View Profile
          </button>
        </Link>
      </div>

      <div className="mt-6">
        <h6 className="text-sm text-tl font-medium mb-2">Skills</h6>
        <div className="flex flex-wrap justify-center gap-2">
          {skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-bgd border border-brd text-txt px-3 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
