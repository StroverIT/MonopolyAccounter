PORT=5000
MONGO_URL=mongodb://localhost:27017/monopolyAccounter

-------- BUGS:

Bg colors are not showing on buying and on receive card

------- Tasks to do:

What happens if i can't buy the card ? []
On start game - sometimes is not showing the user data
Uppon reset, join the same lobby and get user data
-useffect(()=>{}, [socket]) []

Remove money styling component - he is not in use anymore[]

on color cards menu show all data for the card []

When player leave, to wrtie on global log. Player has left the game []

Add index, remove index, put on index []

When is on index with tax => tax the player []

Different type cards with transport and electrition type []

Fix downgrade on color cards []
Formater for money
When is on mortgage => dont get money
Implement the auction []
Trading []
How to check if someone is actually banckrupted []
When someone step on someone property []
If someone had buy for example brown and another one buy a brown card []
If not enough money to buy the property - auction, buyCard =>{
send to menu for selling, And if networth is not enough, he must trade with someone else or drop the card
}

Logs the action When someone=>{

- Buy card => `${player.name} купи ${card} за ${boughPrice}`
- Buy a house => `${player.name} построи къща на ${card}`
- Destroy a house => `${player.name} разруши къща на ${card}`
- Lost money => `${player.name} даде ${money} на баката`
- Won money => `${player.name} спечели ${money} от банката`
- Auction Win => `${player.name} купи ${card} на аукцион за ${money}`

  }
