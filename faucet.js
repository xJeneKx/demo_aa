const headlessWallet = require('headless-obyte');
const eventBus = require('ocore/event_bus');

eventBus.once('headless_wallet_ready', async () => {
	headlessWallet.setupChatEventHandlers();

	let device = require('ocore/device');
	eventBus.on('text', (from_address, text) => {
		if (text.match(/To receive free bytes/)) {
			headlessWallet.readSingleAddress(address => {
				device.sendMessageToDevice(from_address, 'text', address);
				console.error('sent', address);
				console.error('Awaiting response...');
			})
		} else {
			console.error('text', from_address, ' - ', text)
		}
	});

	await acceptInvitation('obyte.org/bb-test', 'AxBxXDnPOzE/AxLHmidAjwLPFtQ6dK3k70zM0yKVeDzC', '0000');
});


function acceptInvitation(hub_host, device_pubkey, pairing_secret) {
	return new Promise((resolve, reject) => {
		let device = require('ocore/device');

		if (device_pubkey === device.getMyDevicePubKey())
			return reject("cannot pair with myself");

		if (!device.isValidPubKey(device_pubkey))
			return reject("invalid peer public key");

		device.addUnconfirmedCorrespondent(device_pubkey, hub_host, 'New', function (device_address) {
			device.startWaitingForPairing(function (reversePairingInfo) {
				device.sendPairingMessage(hub_host, device_pubkey, pairing_secret, reversePairingInfo.pairing_secret, {
					ifOk: resolve,
					ifError: reject
				});
			});
		});
	});
}