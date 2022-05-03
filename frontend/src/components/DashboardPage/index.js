import DashboardNotesContainer from "../DashboardNotesContainer";

function DashboardPage() {
    return (
        <div className="dashboard-container">
            <div>
                <img
                    className="dashboard-background"
                    // id="notes-btn"

                    alt="background"
                    src="
                        /images/dashboard-background.jpg"
                />
            </div>
            <div className="dashboard-header">
                <span className="welcome-span">Good morning/Evening</span>
                <span className="date-span">DATE</span>
            </div>
            <DashboardNotesContainer />
        </div>
    );
}
export default DashboardPage
