import "./UsersList.scss";

export const UsersList = ({
  username,
  displayName,
  dp,
  email,
  handleUsersListItemClick,
}) => {
  return (
    <>
      <div>
        <div
          className="users-list-item"
          onClick={() => handleUsersListItemClick(username)}
        >
          <div className="user-dp">
            <img className="dp" src={dp} />
          </div>
          <div className="names">
            <div>
              <b>Displayname:</b> {displayName}
            </div>
          </div>
          <div className="user-email">
            <p>
              <b>Email:</b>
              {email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
