import React from 'react';
import PropTypes from 'prop-types';

const FriendRequestList = ({ requests, onAccept, onDecline }) => {
  return (
    <div className="friend-request-list">
      <h3>Friend Requests</h3>
      {(!requests || requests.length === 0) ? ( // Provera da requests nije null ili undefined
        <p>No friend requests.</p>
      ) : (
        <ul>
          {requests.map((request, index) => (
            <li key={request.username || index}> {/* Koristi username kao ključ, ili index kao rezervu */}
              {request.username}
              <button onClick={() => onAccept(request.username)}>Accept</button>
              <button onClick={() => onDecline(request.username)}>Decline</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Dodavanje PropTypes za validaciju (opcionalno)
FriendRequestList.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    })
  ),
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default FriendRequestList;
