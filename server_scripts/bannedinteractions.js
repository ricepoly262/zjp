//priority: -9999

onEvent('block.place', e => {          
    let block = e.getBlock()
    let ply = e.getEntity()
    
    zjp_bannedinteractions.forEach(interaction => {
        let b1 = interaction[0]

        if(block == b1){
            let b2 = interaction[1]
        
            let up = block.getUp()
            let down = block.getDown()
            let north = block.getNorth()
            let south = block.getSouth()
            let east = block.getEast()
            let west = block.getWest()
            let a = [up,down,north,south,east,west]
            
            //ply.tell(`b2 event fired ${b2}`)

            a.forEach(testBlock => {
                if(testBlock == b2){
                    ply.tell(Text.of(`Woah there ${ply}, you cant place that`).red())
                    ply.tell(Text.of(`${b1} on \n${b2}!`).darkRed())
                    ply.tell(Text.of(`Attempts to circumvent will be met with a ban `).red())                           
                    e.cancel()
                }
            })
        }
    })

    zjp_noplace.forEach(b => {     
        if(block == b){
            ply.tell(Text.of(`Woah there ${ply}, you cant place that`).red())    
            ply.tell(Text.of(`${b}!`).darkRed())      
            ply.tell(Text.of(`Attempts to circumvent will be met with a ban `).red())                 
            e.cancel()           
        }

    })

})