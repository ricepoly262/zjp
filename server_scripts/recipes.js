onEvent('recipes', event => {
	zjp_nocraft.forEach(item => {
		event.remove({output: item })
	})
})

function newRecipe(event,output,amount,inputs,id,lore){
	let e = event
	
	let A1 = inputs[0] || 'minecraft:air' // top left slot
	let A2 = inputs[1] || 'minecraft:air'// top middle slot
	let A3 = inputs[2] || 'minecraft:air' // top right slot
	let B1 = inputs[3] || 'minecraft:air' // middle left slot
	let B2 = inputs[4] || 'minecraft:air' // middle slot 
	let B3 = inputs[5] || 'minecraft:air' // middle right slot	
	let C1 = inputs[6] || 'minecraft:air' // bottom left slot
	let C2 = inputs[7] || 'minecraft:air' // bottom middle slot
	let C3 = inputs[8] || 'minecraft:air'	// bottom right slot 

	if(lore.length>0){
		e.shaped(Item.of(output, amount, {display:{Lore:[`[{"text":"${lore}","italic":false,"color":"aqua"}]`]}}), [
			'ABC',
			'DEF',
			'GHI'
		], { 
			A: A1, B: A2, C: A3,
			D: B1, E: B2, F: B3,
			G: C1, H: C2, I: C3
		}).id(`kubejs:zjp/${id}`)
	}else{
		e.shaped(Item.of(output, amount), [
			'ABC',
			'DEF',
			'GHI'
		], { 
			A: A1, B: A2, C: A3,
			D: B1, E: B2, F: B3,
			G: C1, H: C2, I: C3
		}).id(`kubejs:zjp/${id}`)
	}

}
function newRecipeNBT(event,output,amount,inputs,id,nbt){
	let e = event

	let A1 = inputs[0] || 'minecraft:air' // top left slot
	let A2 = inputs[1] || 'minecraft:air'// top middle slot
	let A3 = inputs[2] || 'minecraft:air' // top right slot
	let B1 = inputs[3] || 'minecraft:air' // middle left slot
	let B2 = inputs[4] || 'minecraft:air' // middle slot 
	let B3 = inputs[5] || 'minecraft:air' // middle right slot	
	let C1 = inputs[6] || 'minecraft:air' // bottom left slot
	let C2 = inputs[7] || 'minecraft:air' // bottom middle slot
	let C3 = inputs[8] || 'minecraft:air'	// bottom right slot 

	if(lore.length>0){
		e.shaped(Item.of(output, amount, nbt), [
			'ABC',
			'DEF',
			'GHI'
		], { 
			A: A1, B: A2, C: A3,
			D: B1, E: B2, F: B3,
			G: C1, H: C2, I: C3
		}).id(`kubejs:zjp/${id}`)
	}else{
		e.shaped(Item.of(output, amount), [
			'ABC',
			'DEF',
			'GHI'
		], { 
			A: A1, B: A2, C: A3,
			D: B1, E: B2, F: B3,
			G: C1, H: C2, I: C3
		}).id(`kubejs:zjp/${id}`)
	}
}	
