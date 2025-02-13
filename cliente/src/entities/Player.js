const Player = {
    id : null,
    x: 0,
    y: 0,
    status: 0,
    direction: 0,
    visibility: true,
}


export const GivenID = {
    id : -1,
    setID : (newID)=>{
        if(GivenID.id == -1){
            GivenID.id = newID
        }
    },

    getID : () =>{
        return GivenID.id;
    }
};
