import React, { useState } from 'react'
import ContestContext from './ContestContext'
const ContestState = (props) => {
    const [contest, setContest] = useState([])
    const [contestId, setContestId] = useState("")
    const getContest = async (id) => {
        try {
            const url = `http://localhost:3001/admin/get-contest/${id}`;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data=await res.json();
            setContest(data);
        } catch (error) {
            console.error("Error fetching contest:", error);
        }
    }
    return (
        <ContestContext.Provider value={{
            contest, setContest,
            getContest,
            contestId,setContestId
        }} >
            {props.children}
        </ContestContext.Provider>
    )
}

export default ContestState
