import "./UserEditPopup.scss";
import { GrClose } from "react-icons/gr";

export const UserEditPopup = ({
  username,
  displayName,
  dp,
  email,
  setShowPopup,
  handleDeleteUser,
  handleUserRoleChange,
  userRoleState,
  setUserRoleState,
  metadata,
}) => {
  return (
    <div className="user-edit-popup">
      <div className="user-edit-popup-interior">
        <GrClose
          className="user-edit-close-button"
          onClick={() => setShowPopup(false)}
        />
        <div className="profile">
          <div className="dp-container">
            <div className="dp-border">
              <img src={dp} alt="DP of the user" className="profile-picture" />
            </div>
          </div>
          <div className="user-display-name">
            <h2 className="column-item-left">Display Name</h2>
            <h2 className="column-item-colon">:</h2>
            <h2 className="column-item-right">{displayName}</h2>
          </div>
          <div className="user-username">
            <p className="column-item-left">Username</p>
            <p className="column-item-colon">:</p>
            <p className="column-item-right">@{username}</p>
          </div>
          <div className="user-email-id">
            <p className="column-item-left">Email ID</p>
            <p className="column-item-colon">:</p>
            <p className="column-item-right">
              <i>{email}</i>
            </p>
          </div>
          <div className="user-userrole">
            <p className="column-item-left">User's Role</p>
            <p className="column-item-colon">:</p>
            <div className="column-item-right-drop-down">
              <select
                value={userRoleState}
                onChange={(e) => setUserRoleState(e.target.value)}
              >
                <option value="Normal-User">Normal-User</option>
                <option value="Admin">Admin</option>
                <option value="No-Access-User">No Access</option>
              </select>
            </div>
            {/* <p className="column-item-right">{userRole}</p> */}
          </div>
          <div className="profile-footer-buttons">
            <div className="column-item-left">
              <button
                className="button-delete-user"
                onClick={() => handleDeleteUser(username)}
              >
                Delete User
              </button>
            </div>
            <p className="column-item-colon"> </p>
            <div className="column-item-right">
              <button
                className="button-save-changes"
                onClick={() =>
                  handleUserRoleChange(username, userRoleState, metadata)
                }
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
