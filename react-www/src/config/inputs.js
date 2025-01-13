export const INPUTS = {
    predictWinner:{
        fields: [
            { id: 'player1', label: 'Player 1' },
            { id: 'player2', label: 'Player 2' },
        ],
        selectionMenu:{ 
            id: 'court_surface',
            menuLabel: 'Court Surface:',
            menuText: 'Select a Surface',
            options: [
                { id: 'clay', label: 'Clay' },
                { id: 'grass', label: 'Grass' },
                { id: 'hardCourt', label: 'Hard Court' },
            ],
        }
    },

    lookupStats:{
        fields: [
            {id: 'player', label: 'Player'}
        ],
    },
}