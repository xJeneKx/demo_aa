exports.bLight = true; // change to false to run as full node
exports.bSingleAddress = true; //should always be true

exports.WS_PROTOCOL = "wss://";
exports.hub = process.env.testnet ? 'obyte.org/bb-test' : 'obyte.org/bb';
exports.deviceName = 'AA-channel-application';
exports.permanent_pairing_secret = '0000';
exports.control_addresses = [''];


exports.isHighAvaibilityNode =  false;

exports.enabledReceivers = ['http','obyte-messenger']; //configure the communication layers that can receive a message from peer
// if 'http' is present, a http server will start to listen at port httpDefaultPort
// if 'obyte-messenger' is present, messages incoming through the encypted chat layers will be treated (not possible in High availability mode)

exports.httpDefaultPort = 6800;