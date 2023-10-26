import { useEffect, useState } from "react"
import { addPlayerToTeam, deletePlayer, getAllPlayers, getAllPositions } from "../../../services/playerService"
import { Link, useNavigate } from "react-router-dom"
import "./Players.css"


export const PlayerList = ({ currentUser }) => {

    const [players, setPlayers] = useState([])
    const [filteredPlayers, setFilteredPlayers] = useState([])
    const [positions, setPositions] = useState([])
    const [selectedPosition, setSelectedPostition] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [freeAgents, setFreeAgents] = useState(false)

    const navigate = useNavigate()

    const getdata = () => {
        getAllPlayers().then((pArray) => {
            setPlayers(pArray)
            setFilteredPlayers(pArray)

        })
    }

    useEffect(() => {
        getdata()

    }, [])


    useEffect(() => {
        if (searchTerm.length === 0) {
            setFilteredPlayers(players)
        } else {
            const foundPlayers = players.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredPlayers(foundPlayers)
        }
    }, [searchTerm, players])


    useEffect(() => {
        getAllPositions().then((posArray) => {
            setPositions(posArray)
        })
    })


    useEffect(() => {
        if (selectedPosition) {
            const foundPlayers = players.filter((p) => p.positionId == selectedPosition)
            setFilteredPlayers(foundPlayers)

        } else {
            setFilteredPlayers(players)
        }
    }, [selectedPosition, players])


    useEffect(() => {
        if (freeAgents) {
            const unclaimedPlayers = players.filter((p) => p.teamId === 0)
            setFilteredPlayers(unclaimedPlayers)

        } else {
            setFilteredPlayers(players)
        }
    }, [freeAgents, players])


    const handleDelete = (player) => {
        deletePlayer(player.id)
            .then(() => {
                getdata()
            })
    }

    const handlePlayerAddToTeam = (player) => {
        const newPlayerTeam = {
            name: player.name,
            height: player.height,
            weight: player.weight,
            fortyTime: player.fortyTime,
            positionId: player.positionId,
            teamId: currentUser.id,
            id: player.id,
            imageLink: player.imageLink
        }

        addPlayerToTeam(newPlayerTeam)
            .then(() => {
                console.log(newPlayerTeam)
                navigate('/myplayers')
            })
    }





    return (

        <div>
            <div className="filter-bar">
                {/* the search bar  */}
                <div className="player-search">
                    <input
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }}
                        type="text"
                        placeholder="Search Players"
                        className="player-input"
                    />
                </div>
                {/* the dropdown selector */}
                <div className="player-search">
                    <select
                        onChange={(event) => {
                            setSelectedPostition(event.target.value)

                        }}
                        value={selectedPosition}
                        className="player-select"
                    >
                        <option value="">Select a position</option>
                        {positions.map((pos) => (
                            <option key={pos.id}
                                value={pos.id}>
                                {pos.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="player-search">
                    <button
                        className={`btn-${freeAgents ? 'secondary' : 'primary'} freeagent-btn`}
                        onClick={() => {
                            setFreeAgents(!freeAgents) //toggle the state
                        }}
                    >
                        {freeAgents ? "Free Agents" : "All Players"}
                    </button>
                </div>
                </div>


                <div className="player-container" >
                    {filteredPlayers.map((playerObj) => {
                        return (

                            <div className="players" key={playerObj.id}>

                                <img className="player-img" src={playerObj.imageLink} alt="playerimg" />
                                <Link to={`/allplayers/${playerObj.id}`}>
                                    <div className="player-info player-title" player={playerObj} >{playerObj?.name}</div>
                                </Link>
                                <div className="player-info player-body player-pos">{playerObj?.position.name}</div>
                                <div className="player-info player-body">{playerObj?.team?.name}</div>
                                <div className="btn-container">
                                    {playerObj.teamId === 0 ? (<button
                                        className="btn btn-delete"
                                        onClick={() => handlePlayerAddToTeam(playerObj)}

                                    >
                                        ADD PLAYER</button>) : ""
                                    }
                                    {currentUser.id === 1 ? (<button
                                        className="btn btn-delete"
                                        onClick={() => handleDelete(playerObj)}

                                    >
                                        DELETE</button>) : ""
                                    }

                                </div>
                            </div>


                        )
                    })}
                </div>
            </div>
            )
}





