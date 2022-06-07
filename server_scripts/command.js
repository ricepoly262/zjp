onEvent('command.run', event => {
    let results = event.getParseResults();
    let reader = results.reader;
    let context = results.context;
    let source = context.getSource();
    let fullcommand = reader.string;

    if(source.entity){
        let player = source.entity.asKJS();
        let playername = player.name;
        if(fullcommand.equals('/kubejs hand') && results.exceptions.equals({})){
            tellraw(event,playername,player)
        
        }
    }
})

let tellraw = (event,playername,player) => event.server.schedule(100, () => {
    let banned = zjp_checkBan(player.mainHandItem.id)

    if(banned){
        let command = `/tellraw ${playername} ["",{"text":"This item is banned. Would you like to unban?","color":"#0FFFCA"},{"text":"\\n"},{"text":"Yes","color":"#00FF0A","clickEvent":{"action":"run_command","value":"/kubejs custom_command zjp_unbanhand"},"hoverEvent":{"action":"show_text","contents":"Unban item"}},{"text":"             ","color":"#0FFFCA"},{"text":"No","color":"#FF0003","clickEvent":{"action":"run_command","value":"/tellraw ${playername} {\\"text\\":\\"Item will not be banned.\\",\\"color\\":\\"aqua\\"}"},"hoverEvent":{"action":"show_text","contents":"Keep item banned"}}]`
        event.server.runCommand(command)
    }
    else{
        let command = `/tellraw ${playername} ["",{"text":"Add this item to the ban list?","color":"#0FFFCA"},{"text":"\\n"},{"text":"Yes","color":"#00FF0A","clickEvent":{"action":"run_command","value":"/kubejs custom_command zjp_banhand"}},{"text":" \\u0020 \\u0020 \\u0020 \\u0020 \\u0020 \\u0020 ","color":"#0FFFCA"},{"text":"No","color":"#FF0003","clickEvent":{"action":"run_command","value":"/tellraw ${playername} {\\"text\\":\\"Item will not be banned.\\",\\"color\\":\\"aqua\\"}"}}] `
        event.server.runCommand(command)
    }

})
  

onEvent('server.custom_command', event => {
    if (event.player.op) {
        if (event.id == 'zjp_banhand') {
            let item = event.player.mainHandItem
            banned = zjp_banItem(item.id,event.player.name,item.isBlock())
            if(banned){
                event.player.tell("Item banned!")
            }else{
                event.player.tell("ERROR BANNING ITEM")
            }
        }
        if (event.id == 'zjp_unbanhand') {
            let item = event.player.mainHandItem
            unbanned = zjp_unbanItem(item.id,event.player.name)
            if(unbanned){
                event.player.tell("Item unbanned!")
            }else{
                event.player.tell("ERROR UNBANNING ITEM")
            }
        }        
    }

})