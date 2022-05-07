import DashboardNotesContainer from "../DashboardNotesContainer";
import {useSelector} from 'react-redux'
function DashboardPage() {
    const sessionUser = useSelector((state) => state.session.user);
    const user = sessionUser.username;
    const date = new Date();
    let today = date.toDateString();
    // {`Last edited ${currentNote?.updatedAt.toString().slice(0, 10)}, ${currentNote?.updatedAt.toString().slice(11, 16)}`}
    return (
        <div className="dashboard-container">
            <div>
                <img
                    className="dashboard-background"

                    alt="background"
                    src="
                        /images/dashboard-background.jpg"
                />
            </div>
            <div className="dashboard-header">
                <span className="welcome-span">{`Welcome back, ${user}!`}</span>
                <span className="date-span">{today}</span>
            </div>
            <DashboardNotesContainer />
        </div>
    );
}
export default DashboardPage
