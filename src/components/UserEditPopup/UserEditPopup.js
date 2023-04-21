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
                <GrClose className="user-edit-close-button" onClick={() => setShowPopup(false)}/>
                <div className="profile">
                    <div className="dp-container">
                            <img src={dp} className="profile-picture" />
                    </div>
                    <div className="user-details">
                        Username: {username}
                    </div>
                    <div className="user-details">
                        Display Name: @{displayName}
                    </div>
                    
                    <div className="user-details">
                        Email ID: <i>{email}</i>
                    </div>
                    <div className="user-details">
                        User's Role: 
                        <div className="column-item-right-drop-down">
                            <select value={userRoleState} onChange={(e) => setUserRoleState(e.target.value)}>
                                <option value="Normal-User">Normal-User</option>
                                <option value="Admin">Admin</option>
                                <option value="No-Access-User">No Access</option>
                            </select>
                        </div>
                    </div>
                    <div className="profile-footer-buttons">
                            <button className="button-delete-user" onClick={() => handleDeleteUser(username)}>Delete User</button>
                            <button className="button-save-changes" onClick={() => handleUserRoleChange(username, userRoleState)}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
