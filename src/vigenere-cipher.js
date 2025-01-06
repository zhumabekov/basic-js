const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect; 
  }

  shiftChar(char, keyChar, isEncrypting = true) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charCode = char.toUpperCase().charCodeAt(0);
    const keyCode = keyChar.toUpperCase().charCodeAt(0);

    if (charCode < 65 || charCode > 90) {
      return char;
    }

    const shift = keyCode - 65; 
    const newCharCode = isEncrypting 
      ? ((charCode - 65 + shift) % 26) + 65
      : ((charCode - 65 - shift + 26) % 26) + 65; 
    
    return String.fromCharCode(newCharCode);
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Invalid input');
    }

    let result = [];
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      const keyChar = key[keyIndex % key.length];

      result.push(this.shiftChar(char, keyChar, true));
      if (/[A-Za-z]/.test(char)) {
        keyIndex++; 
      }
    }

    return this.isDirect ? result.join('') : result.reverse().join('');
  }

  // Decrypt function
  decrypt(message, key) {
    if (!message || !key) {
      throw new Error('Invalid input');
    }

    let result = [];
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      const keyChar = key[keyIndex % key.length];

      result.push(this.shiftChar(char, keyChar, false)); 
      if (/[A-Za-z]/.test(char)) {
        keyIndex++; 
      }
    }

    return this.isDirect ? result.join('') : result.reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
