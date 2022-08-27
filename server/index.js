var functions = require('firebase-functions');
var firebase = require('firebase-admin');
var storage = firebase.storage();
const bucket = storage.bucket("momentix");

const fetch = require('node-fetch');

var imageDataURI = require("image-data-uri");
var textToImage = require("text-to-image");
var text2png = require('text2png');
var sigUtil = require("eth-sig-util");

const { ethers } = require("ethers");

var QRCode = require('qrcode');

const secret = "urbansombrero";

//const provider = require('@ankr.com/ankr.js');
//const provider = new ankr.AnkrProvider('');

const prov = {"url": "https://polygon-mumbai.g.alchemy.com/v2/Ptsa6JdQQUtTbRGM1Elvw_ed3cTszLoj"};
var provider = new ethers.providers.JsonRpcProvider(prov);
const eventJSON = require(__base + 'nftpass/Event.json');

const gasOptions = {"maxPriorityFeePerGas": "45000000000", "maxFeePerGas": "45000000016" };

function cors(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET, POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      //res.status(204).send('');
    } else {
      // Set CORS headers for the main request
      res.set('Access-Control-Allow-Origin', '*');
    }
    return res;
  }

module.exports = {

    "mint": async function(req,res) {
        res = cors(req, res);
        if (req.method === 'OPTIONS') {
            return res.status(204).send('');
        }
        //TODO: API auth !!

        //const addr = "0x0F74e1B1b88Dfe9DE2dd5d066BE94345ab0590F1";
        //const event = "0x874fE156D399c08B89BAe5DbcF8Bb5b4F0A9603a";
        const addr = req.query.address;
        const event = req.query.event;

        // need to mint
        var signer = new ethers.Wallet(process.env.MOMENTIX_PRIV, provider);
        const eventContract = new ethers.Contract(
            event,
            eventJSON.abi,
            signer
        );
        await (await eventContract.safeMint(addr, gasOptions)).wait();
        return res.json({
            "status": "Minted"
        });
    },

    "qrcode": async function(req,res) {
        res = cors(req, res);
        if (req.method === 'OPTIONS') {
            return res.status(204).send('');
        }
        //onst addr = "0x0F74e1B1b88Dfe9DE2dd5d066BE94345ab0590F1";
        //const event = "0x874fE156D399c08B89BAe5DbcF8Bb5b4F0A9603a";
        //const tokenId = "0";
        const addr = req.query.address;
        const event = req.query.event;
        var tokenId = req.query.tokenId;
        if (!tokenId) {
            // need to mint
            var signer = new ethers.Wallet(process.env.MOMENTIX_PRIV, provider);
            const eventContract = new ethers.Contract(
                event,
                eventJSON.abi,
                signer
            );
            var transferFilter = await eventContract.filters.Transfer(null, addr);
            eventContract.on(transferFilter, async (from, to, id, event) => { 
                console.log("transfer", id, event);
                tokenId = id;
                var hashed = ethers.utils.id(addr + event + tokenId + secret);
                console.log(hashed);
                var data = {
                    "address": addr,
                    "event": event,
                    "tokenId": tokenId,
                    "hash": hashed
                };
                var url = await QRCode.toDataURL(JSON.stringify(data));
                var string = await QRCode.toString(JSON.stringify(data));
                console.log(url);
                res.json({
                    "url": url,
                    "string": string,
                    "data": data
                });
                res.end();
            });
            await (await eventContract.safeMint(addr, gasOptions)).wait();
        } else {
            var hashed = ethers.utils.id(addr + event + tokenId + secret);
            console.log(hashed);
            var data = {
                "address": addr,
                "event": event,
                "tokenId": tokenId,
                "hash": hashed
            };
            var url = await QRCode.toDataURL(JSON.stringify(data));
            var string = await QRCode.toString(JSON.stringify(data));
            console.log(url);
            res.json({
                "url": url,
                "string": string,
                "data": data
            });
        }
    },

    "verify": async function(req,res) {
        res = cors(req, res);
        if (req.method === 'OPTIONS') {
            return res.status(204).send('');
        }
        const addr = req.query.address;
        const event = req.query.event;
        const tokenId = req.query.tokenId;
        const scannedHash = req.query.hash;
        //const addr = "0x0F74e1B1b88Dfe9DE2dd5d066BE94345ab0590F1";
        //const event = "0x874fE156D399c08B89BAe5DbcF8Bb5b4F0A9603a";
        //const tokenId = "0";
        //var scannedHash = ethers.utils.id(addr + event + tokenId + secret);
        console.log(addr, event, tokenId, secret);
        
        var hashed = ethers.utils.id(addr + event + tokenId + secret);
        if (hashed != scannedHash) {
            return res.json({
                "error": "invalid qr code"
            });
        }
        // TODO: check ownership has not changed
        const eventContract = new ethers.Contract(
            event,
            eventJSON.abi,
            provider
        );
        const currentOwner = await eventContract.ownerOf(tokenId);
        if ( currentOwner.toLowerCase() == addr.toLowerCase() ) {
            // the addr from the QR code still owns the NFT
            // TODO: update metadata to reflect admission?
            return res.json({
                "valid": true
            });
        } else {
            console.log(currentOwner, addr);
            return res.json({
                "error": "NFT transferred to another address"
            });
        }
    },

    "image": async function(req,res) {
        res = cors(req, res);
        if (req.method === 'OPTIONS') {
          return res.status(204).send('');
        }
        var path = req.path.split('/');
        var eventName = path[1];
        var fileName = path[3];
        var fileParts = fileName.split('.');
        //var id = fileName.replace(".png", "");
        var id = fileParts[0];
        var type = fileParts[1];
        console.log("id", id);
        console.log("type", type);
    
        console.log(req.path);
        const file = await bucket.file(`${eventName}/images/default.${type}`).download();
        const img = file[0];
        var contentType = 'image/png';
        if ( type == "mp4" ) {
            contentType = 'video/mp4';
        }
        res.set('Cache-Control', 'public, max-age=1800, s-maxage=3600');
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Length': img.length
        });
        return res.end(img);
      }, // image
    
      "meta": async function(req,res) {
        res = cors(req, res);
        if (req.method === 'OPTIONS') {
          return res.status(204).send('');
        }
        var path = req.path.split('/');
        var id = path[3];
        var eventName = path[1];
        console.log("id", id);

        console.log(req.path);
 
        const file = await bucket.file(`${eventName}/meta/default.json`).download();
        const data = JSON.parse(file[0]);
        console.log("data", data);
        //data.image = `https://api.momentix.xyz/${eventName}/images/${id}.png`;
        //data.animation_url = `https://api.momentix.xyz/${eventName}/images/${id}.mp4`;
        if (id == 1) {
            data.image = `https://app.momentix.xyz/images/ethtoronto/admitted.png`;
            data.animation_url = "";
        }
        if (id == 2) {
            data.animation_url = `https://app.momentix.xyz/images/ethtoronto/recap.mp4`;
        }
        res.set('Cache-Control', 'public, max-age=1800, s-maxage=3600');
        return res.json(data);
      } // meta

};