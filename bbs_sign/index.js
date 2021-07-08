"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_bbs_signatures_1 = require("@mattrglobal/node-bbs-signatures");
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var keyPair, messages, signature, isVerified, isVerifiedString, proof, isProofVerified, isProofVerifiedString;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, node_bbs_signatures_1.generateBls12381G2KeyPair()];
            case 1:
                keyPair = _a.sent();
                console.log("Key pair generated");
                console.log("Public key base64 = " + Buffer.from(keyPair.publicKey).toString("base64"));
                messages = [
                    Uint8Array.from(Buffer.from("message1", "utf-8")),
                    Uint8Array.from(Buffer.from("message2", "utf-8")),
                ];
                console.log("Signing a message set of " + messages);
                return [4 /*yield*/, node_bbs_signatures_1.blsSign({
                        keyPair: keyPair,
                        messages: messages,
                    })];
            case 2:
                signature = _a.sent();
                console.log("Output signature base64 = " + Buffer.from(signature).toString("base64"));
                return [4 /*yield*/, node_bbs_signatures_1.blsVerify({
                        publicKey: keyPair.publicKey,
                        messages: messages,
                        signature: signature,
                    })];
            case 3:
                isVerified = _a.sent();
                isVerifiedString = JSON.stringify(isVerified);
                console.log("Signature verified ? " + isVerifiedString);
                return [4 /*yield*/, node_bbs_signatures_1.blsCreateProof({
                        signature: signature,
                        publicKey: keyPair.publicKey,
                        messages: messages,
                        nonce: Uint8Array.from(Buffer.from("nonce", "utf-8")),
                        revealed: [0],
                    })];
            case 4:
                proof = _a.sent();
                console.log("Output proof base64 = " + Buffer.from(proof).toString("base64"));
                return [4 /*yield*/, node_bbs_signatures_1.blsVerifyProof({
                        proof: proof,
                        publicKey: keyPair.publicKey,
                        messages: messages.slice(0, 1),
                        nonce: Uint8Array.from(Buffer.from("nonce", "utf-8")),
                    })];
            case 5:
                isProofVerified = _a.sent();
                isProofVerifiedString = JSON.stringify(isProofVerified);
                console.log("Proof verified ? " + isProofVerifiedString);
                return [2 /*return*/];
        }
    });
}); };
main();
