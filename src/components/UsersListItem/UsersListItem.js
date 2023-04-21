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
                 <img className="dp" src={dp} />
            </div>
            <div  className="names">
                <i><b>{username}</b></i>
                <div>@{displayName}</div>
            </div>
            <div className="user-email">
                <p>{email}</p>
            </div>
            <div className="user-role">
                <p>{userRole}</p>
            </div>
        </div>
    );
};