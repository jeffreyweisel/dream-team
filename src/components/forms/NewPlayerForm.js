import { useState, useEffect } from "react"

import "./Forms.css"
import { useNavigate } from "react-router-dom"
import { addNewPlayer, getAllPositions } from "../../services/playerService"

export const NewPlayerForm = ({ currentUser }) => {

    const navigate = useNavigate()

    const [positions, setPositions] = useState([])
    const [selectedPosition, setSelectedPosition] = useState('')

    const [newPlayer, setNewPlayer] = useState({
        name: '',
        height: '',
        weight: '',
        fortyTime: '',
        teamId: 0,
        positionId: 0
    })


    useEffect(() => {
        // Fetch all topics
        getAllPositions().then((pArray) => {
            setPositions(pArray)
            console.log(pArray)
        })

    }, [])


    const handleInputChange = (event) => {
        const stateCopy = { ...newPlayer }
        stateCopy[event.target.name] = event.target.value
        setNewPlayer(stateCopy)

    }

    const handleSave = (event) => {
        event.preventDefault()
        console.log('Clicked')

        addNewPlayer(newPlayer).then(() => {
            navigate(`/allplayers`)
        })

    }

    // Update topicId in newPost when the user selects a topic
    useEffect(() => {
        setNewPlayer({
            ...newPlayer,
            positionId: parseInt(selectedPosition)      //spread operator to change topicId on onChange 
        })
    }, [selectedPosition])


    return (
        <form className="new-post">
            <h2>New Player</h2>
            <fieldset>
                <div className="form-group">
                    {/* the dropdown selector */}
                    <select
                        className="post-select"
                        onChange={(event) => setSelectedPosition(event.target.value)
                        }
                        value={selectedPosition}
                        required
                    >
                        <option value=''>Select a position</option>
                        {positions.map((p) => (
                            <option key={p.id}
                                value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={newPlayer.name}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Height</label>
                    <input type="text"
                        value={newPlayer.height}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="height" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Weight</label>
                    <input type="text"
                        value={newPlayer.weight}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="weight" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>40 Yard Dash</label>
                    <input type="text"
                        value={newPlayer.fortyTime}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="fortyTime" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button
                        className="form-btn btn-secondary"
                        onClick={handleSave}
                    >
                        Save Player
                    </button>
                </div>
            </fieldset>
        </form>
    )


}