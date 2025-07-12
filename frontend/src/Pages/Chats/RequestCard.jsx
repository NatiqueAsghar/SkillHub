import React from "react";
import { Link } from "react-router-dom";

const RequestCard = ({ picture, bio, name, skills, rating, username }) => {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={picture}
          alt="user"
        />
      </div>

      {/* Name & Rating */}
      <div className="text-center">
        <h3 className="text-xl font-semibold">{name}</h3>
        <h6 className="text-sm text-gray-600 dark:text-gray-300">Rating: {rating}</h6>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-700 dark:text-gray-200 mt-2 text-center">{bio}</p>

      {/* View Profile Button */}
      <div className="flex justify-center mt-4">
        <Link to={`/profile/${username}`}>
          <button className="bg-transparent border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-4 py-2 rounded-full transition-all duration-200">
            View Profile
          </button>
        </Link>
      </div>

      {/* Skills */}
      <div className="mt-6">
        <h6 className="text-sm font-medium mb-2">Skills</h6>
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-teal-100 text-teal-700 dark:bg-teal-700 dark:text-white px-3 py-1 rounded-full text-xs"
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
