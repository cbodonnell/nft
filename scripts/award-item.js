const DonoToken = artifacts.require('DonoToken');

// TODO: Can this be imported somehow from utils??
const random = (length = 8) => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
};

module.exports = async function(callback) {
    let donoToken = await DonoToken.deployed();
    const account = "0xcaeB934174B93991a537345f31b76911d56763D2";
    const item = `https://donotoken.org/tokens/${random(32)}.json`;
    await donoToken.awardItem(account, item);
    console.log(`Awarded item: ${item}`);
    callback();
};