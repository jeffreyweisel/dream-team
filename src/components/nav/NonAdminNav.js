import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { useEffect, useState } from "react"
import { getTeamByUserId } from "../../services/playerService"






export const NonAdminNavBar = ({currentUser}) => {

    const navigate = useNavigate()
    

    const [team, setTeam] = useState({ name: ""})
    

    useEffect(() => {
        getTeamByUserId(currentUser.id).then((data) => {
            const teamObj = data[0]
            setTeam(teamObj)
        })
    }, [currentUser])


    return (
        <ul className="navbar">
            <div className="teamname">
                <li>
                    {team?.user?.name}
                </li>
            </div>
            <div className="navbar-items">
                <li className="navbar-item">
                    <Link to="/allplayers">Players</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/myplayers">Lineup</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/league">League</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/myteam">Manage</Link>
                </li>
                {localStorage.getItem("dreams_user") ? (
                    <li className="navbar-item logout">
                      <Link
                          to=""
                          onClick={() => {
                              localStorage.removeItem("dreams_user")
                              navigate("/login", { replace: true })
                          }}
                      >
                          Logout
                      </Link>
                    </li>
                ) : (
                    ""
                )}
            </div>
        </ul>
      )
}