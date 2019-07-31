const headlessWallet = require('headless-obyte');
const eventBus = require('ocore/event_bus');
const wallet = require('ocore/wallet');
const composer = require('ocore/composer');
const network = require('ocore/network');

eventBus.once('headless_wallet_ready', () => {
	headlessWallet.setupChatEventHandlers();

});