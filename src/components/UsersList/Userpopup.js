import "./UserPopup.scss";
import { GrClose } from "react-icons/gr";

export const UserPopup = ({
  displayName,
  dp,
  email,
  setShowPopup,
}) => {


    return (
        <div className="user-view-popup">
            <div className="user-view-popup-interior">
                <GrClose className="user-view-close-button" onClick={() => setShowPopup(false)}/>
                <div className="profile-view">
                    <div className="dp-container-view">
                            <img src={dp} className="profile-picture-view" />
                    </div>
                    <div className="user-details-view">
                        Display Name: @{displayName}
                    </div>
                    
                    <div className="user-details-view">
                        Email ID: <i>{email}</i>
                    </div>
                </div>
            </div>
        </div>
    );
};
