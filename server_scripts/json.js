const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const zjp_filepath = 'kubejs/data/zjp/banneditems.json';

var zjp_itemList = {};
var zjp_noPlace = [];
var zjp_bannedItems = [];

zjp_getBannedItems();

function zjp_getBannedItems(){ // gets the banned items
    
    console.log("[ZJP] Reading banned items");
    zjp_itemList = JsonIO.read(zjp_filepath) || {};
    if(zjp_itemList.equals({})){
        console.log("[ZJP] ERROR: Banned items list empty or failed to load")
    }else{
        console.log("[ZJP] Successfully read item list")

        zjp_bannedItems = [];
        zjp_noPlace = [];

        zjp_itemList.forEach(item => {
            if( !zjp_itemList[item].equals({}) ){
                zjp_bannedItems.push(zjp_itemList[item].id);
                if(zjp_itemList[item].actions.noPlace){
                    zjp_noPlace.push(zjp_itemList[item].id)
                }
            }
        })
    }

}

function zjp_checkBan(item){ // checks if an item is banned 
    zjp_getBannedItems();

    if( (zjp_itemList[item] == undefined) || (zjp_itemList[item] == null) || (zjp_itemList[item].equals({})) ){
        return false;
    }
    return true;
}

function zjp_banItem(item,ply,isblock){
    zjp_getBannedItems();

    if( (zjp_itemList[item] == undefined) || (zjp_itemList[item] == null) || (zjp_itemList[item].equals({})) ){
        zjp_itemList[item] = {}
        zjp_itemList[item].id = item;
        zjp_itemList[item].banner = ply.string;
    
        let date = new Date();
        zjp_itemList[item].time = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:00`;
        
        zjp_itemList[item].actions = {};
        zjp_itemList[item].actions.noPlace = isblock;
        zjp_itemList[item].actions.noCraft = true;
        zjp_itemList[item].actions.removeFromInventory = true;
    
        JsonIO.write(zjp_filepath, zjp_itemList);
    
        let banned = zjp_checkBan(item);
        if(banned){
            console.log(`[ZJP] ${ply.string} banned ${item}`);
            return true;
        }
        return false;
    }

    console.log(`[ZJP] ${ply.string} attempted banning ${item} but ${item} is already banned`);
    return true;

}

function zjp_unbanItem(item,ply){
    zjp_getBannedItems();

    if( (zjp_itemList[item] == undefined) || (zjp_itemList[item] == null) || (zjp_itemList[item].equals({})) ){
        console.log(`[ZJP] ${ply.string} attempted unbanning ${item} but ${item} is not banned`);
        return true;
    };

    zjp_itemList[item] = {};

    JsonIO.write(zjp_filepath, zjp_itemList);
    
    let banned = zjp_checkBan(item);
    if(!banned){
        console.log(`[ZJP] ${ply.string} unbanned ${item}`);
        return true;
    }

    return false;


}
