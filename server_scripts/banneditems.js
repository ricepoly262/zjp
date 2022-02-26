onEvent('player.chest.opened', event => {
	removeItemsFromPlayer(event)
})
onEvent('player.inventory.closed', event => {
	removeItemsFromPlayer(event)
})

function removeItemsFromPlayer(event){
	let ply = event.player
	let items = 0
	let itemString = ""

	zjp_banneditems.forEach(item => {
		let badItem = Item.of(item).ignoreNBT()

		if(ply.inventory.find(badItem)>-1){
			
			itemString = itemString + "" + item + "\n"
			items = items + 1

			ply.inventory.clear(badItem)
		}		
  	})

	if(items>1){
		event.player.tell(Text.of(`Woah there ${ply}, you cant have those `).red())
		event.player.tell(Text.of(itemString).darkRed())	
		event.player.tell(Text.of(`${items} Items removed`).red())
		event.player.tell(Text.of(`This interaction has been logged`).red())
	}	  
	else if(items>0){
		event.player.tell(Text.of(`Woah there ${ply}, you cant have that `).red())
		event.player.tell(Text.of(itemString).darkRed())	
		event.player.tell(Text.of(`Item removed`).red())
		event.player.tell(Text.of(`This interaction has been logged`).red())
	}
}

