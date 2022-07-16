//let zjp_bannedItems = Ingredient.of('#mod:tag').itemIds
function removeItems(event) {
	let ply = event.player

	let items = 0
	let itemString = ""

	zjp_bannedItems.forEach(item => {
        if( !(item==Item.empty) ){
            let badItem = Item.of(item).ignoreNBT()

            if (ply.inventory.find(badItem) > -1) {
                itemString = itemString + "" + item + "\n"
                items = items + 1

                if(!ply.op){ply.inventory.clear(badItem)}
            }
        }
	})
    if(!ply.op){
        if (items > 1) {
            event.player.tell(Text.of(`Woah there ${ply}, you cant have those `).red())
            event.player.tell(Text.of(itemString).darkRed())
            event.player.tell(Text.of(`${items} Items removed`).red())
            event.player.tell(Text.of(`This interaction has been logged`).red())
            console.log(`[ZJP] Removed banned items ${items} from ${ply}`)
        }
        else if (items > 0) {
            event.player.tell(Text.of(`Woah there ${ply}, you cant have that `).red())
            event.player.tell(Text.of(itemString).darkRed())
            event.player.tell(Text.of(`Item removed`).red())
            event.player.tell(Text.of(`This interaction has been logged`).red())
            console.log(`[ZJP] Removed banned item ${itemString} from ${ply}`)
        }
    }
    else{
        if (items > 1) {
            event.player.tell(Text.of(`Hey ${ply}, be careful with those `).red())
            event.player.tell(Text.of(itemString).darkRed())
            event.player.tell(Text.of(`${items} banned items!`).red())
            console.log(`[ZJP] Operator ${ply} has banned items ${items}`)
        }
        else if (items > 0) {
            event.player.tell(Text.of(`Hey ${ply}, be careful with that `).red())
            event.player.tell(Text.of(itemString).darkRed())
            event.player.tell(Text.of(`banned item!`).red())
            console.log(`[ZJP] Operator ${ply} has banned item ${items}`)
        }
    }
}

onEvent('player.chest.opened', event => {
	removeItems(event)
})
onEvent('player.inventory.closed', event => {
	removeItems(event)
})
onEvent('player.inventory.changed', event => {
	removeItems(event)
})


onEvent('recipes', event => {
	zjp_bannedItems.forEach(item => {
        if( !(item==Item.empty) ){
            console.log(`[ZJP] Attempting recipes removal for banned item ${item}`)
            event.remove({ output: item })
        }
	})
})

onEvent('recipes.after_load', event => {
	zjp_bannedItems.forEach(item => {
        if( !(item==Item.empty) ){
            console.log(`[ZJP] Attempting recipes.after_load removal for banned item ${item}`)
            event.remove({ output: item })
        }
	})
})


onEvent('block.place', e => {
    if(e.getEntity().isPlayer()){
        let block = e.getBlock()
        let ply = e.getEntity()

        zjp_noPlace.forEach(b => {
            if( !(b==Item.empty) ){
                if (block == b) {
                    if(ply.op){
                        ply.tell(Text.of(`Hey ${ply.name.string}, be careful with that that`).red())
                        ply.tell(Text.of(`${b}!`).darkRed())
                        console.log(`[ZJP] Operator ${ply.name.string} placed ${b}`)
                    }
                    else{
                        ply.tell(Text.of(`Woah there ${ply.name.string}, you cant place that`).red())
                        ply.tell(Text.of(`${b}!`).darkRed())
                        ply.tell(Text.of(`Attempts to circumvent will be met with a ban `).red())
                        console.log(`[ZJP] Blocking ${ply.name.string} from placing ${b}`)
                        e.cancel()
                    }
                }
            }

        })
    }

})