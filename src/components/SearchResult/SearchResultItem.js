import "./SearchResultItem.scss"

export const SearchResultItem = ({result}) => {
    const metaData = JSON.parse(result.meta_data);

    return (
        <div className="users-list-item">
            <div className="user-dp">
                 <img className="dp" src={metaData.dp} alt="dp"/>
            </div>
            <div  className="names">
                <h4>{metaData.displayName}</h4>
                <i>{result.user_name}</i>
            </div>
            <div className="user-email">
                <p><b>{metaData.email}</b></p>
            </div>
            <div className="user-role">
                <p><b>{result.userRole}</b></p>
            </div>
        </div>
    );
};