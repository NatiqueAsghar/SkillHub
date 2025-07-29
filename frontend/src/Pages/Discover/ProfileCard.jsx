import { Link } from "react-router-dom";

const ProfileCard = ({
  profileImageUrl,
  bio,
  name,
  skills,
  rating,
  username,
}) => {
  return (
    <div className="bg-bgd rounded-lg shadow-md p-6 text-center max-w-xs mx-auto">
      <img
        className="w-24 h-24 rounded-full mx-auto object-cover"
        src={profileImageUrl}
        alt="user"
      />
      <h3 className="text-xl font-semibold mt-4 text-tl">{name}</h3>
      <h6 className="text-sm text-txt mt-1">Rating: {rating} ⭐</h6>
      <p className="text-sm text-txt truncate w-[150px] mx-auto mt-2">{bio}</p>

      <div className="mt-4">
        <Link to={`/profile/${username}`}>
          <button className="px-4 py-2 bg-gr hover:bg-grs border border-brd text-txt font-medium rounded-md">
            View Profile
          </button>
        </Link>
      </div>

      <div className="mt-4">
        <h6 className="text-sm font-medium text-tl">Skills</h6>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-hvr border border-bgd text-txt px-2 py-1 rounded-full text-xs font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
