import { Button } from "../Button/Button";
import "./CheckUsernameForm.scss"

export const CheckUsernameForm = ({ username, handleUsernameChange, handleCheckAvailability  }) => {

    return (
        <div className="check-username-form">
            <br />
            <form>
                <label>Enter username:</label>
                <br />
                <input 
                    type="text" 
                    required
                    value = {username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                />
                <br />
                <br />
                <Button label="Check Availability" onClick={handleCheckAvailability}/>
            </form>
        </div>
    );
}
