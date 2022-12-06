ServerEvents.command( event => {
    let results = event.getParseResults();
    let reader = results.reader;
    let context = results.context;
    let source = context.getSource();
    let fullcommand = reader.string;

    if(source.entity){
        let player = source.entity//.asKJS();
        let playername = player.name.string;

        if(fullcommand.equals('kubejs hand') && results.exceptions.equals({})){
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
  
// legacy(not LOL, rip custom commands)
ServerEvents.customCommand( event => {
    if (event.player.op) {
        if (event.id == 'zjp_banhand') {
            let item = event.player.mainHandItem
            let banned = zjp_banItem(item.id,event.player.name,item.isBlock())
            if(banned){
                event.player.tell("Item banned!")
            }else{
                event.player.tell("ERROR BANNING ITEM")
            }
        }
        if (event.id == 'zjp_unbanhand') {
            let item = event.player.mainHandItem
            let unbanned = zjp_unbanItem(item.id,event.player.name)
            if(unbanned){
                event.player.tell("Item unbanned!")
            }else{
                event.player.tell("ERROR UNBANNING ITEM")
            }
        }        
    }

})


/* const zjpOptions = ['ban','unban']

ServerEvents.commandRegistry(event=>{
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('zjp').requires(source => source.getServer().isSingleplayer() || source.hasPermission(2))
        .then(
            Commands.argument("ban", Arguments.STRING.create(event))
            .suggests((ctx, builder) =>
                event.builtinSuggestions.suggest(zjpOptions, builder)
            )
            .executes((ctx) => {
                ctx.source.sendSuccess("worked ?")
                return 1;
            })
        )
    )
});

ServerEvents.commandRegistry(event=>{
    const { commands: Commands, arguments: Arguments, builtinSuggestions: Suggestions } = event;
    event.register(
        Commands.literal("fling")
        .requires(source => {source.getServer().isSingleplayer() || source.hasPermission(2)})
        .then(
        Commands.argument("entity", Arguments.ENTITY.create(event)).then(
        Commands.argument("x", Arguments.FLOAT.create(event)).then(
        Commands.argument("y", Arguments.FLOAT.create(event)).then(
        Commands.argument("z", Arguments.FLOAT.create(event)).executes(ctx => {
            const entity = Arguments.ENTITY.getResult(ctx, "entity").asKJS();
            const x = Arguments.FLOAT.getResult(ctx, "x");
            const y = Arguments.FLOAT.getResult(ctx, "y");
            const z = Arguments.FLOAT.getResult(ctx, "z");
            entity.addMotion(x, y, z);
            entity.minecraftEntity.hurtMarked = true;
            ctx.source.sendSuccess(Text.of([entity.name, " should now be flinging at ", x, ", ", y, ", ", z]), false);
            return 1;
        })))))               
    )
})
 */