import "./UsersListItem.scss"

export const UsersListItem = ({
    username,  
    displayName,
    dp,
    email,
    userRole,
    handleUsersListItemClick
}) => {


    return (
        <div className="users-list-item" onClick={() => handleUsersListItemClick(username)}>
            <div className="user-dp">
                 <img className="dp" src={dp} alt="dp"/>
            </div>
            <div  className="names">
                <h4>{displayName}</h4>
                <i>@{username}</i>
            </div>
            <div className="user-email">
                <p><b>{email}</b></p>
            </div>
            <div className="user-role">
                <p><b>{userRole}</b></p>
            </div>
        </div>
    );
};