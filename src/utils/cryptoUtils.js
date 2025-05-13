// src/utils/cryptoUtils.js

/**
 * MD5 Hashing Function (MIT License)
 * Based on code by Joseph Myers: http://www.myersdaily.org/joseph/javascript/md5-text.html
 * And a version by Jeff Mott: https://github.com/jeffmott/jsMD5
 */
const md5 = (function () {
  function safeAdd(x, y) {
    let lsw = (x & 0xffff) + (y & 0xffff);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function binlMD5(x, len) {
    x[len >> 5] |= 0x80 << len % 32;
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    let a = 0x67452301;
    let b = 0xefcdab89;
    let c = 0x98badcfe;
    let d = 0x10325476;

    for (let i = 0; i < x.length; i += 16) {
      let olda = a;
      let oldb = b;
      let oldc = c;
      let oldd = d;

      a = md5ff(a, b, c, d, x[i + 0], 7, 0xd76aa478);
      d = md5ff(d, a, b, c, x[i + 1], 12, 0xe8c7b756);
      c = md5ff(c, d, a, b, x[i + 2], 17, 0x242070db);
      b = md5ff(b, c, d, a, x[i + 3], 22, 0xc1bdceee);
      a = md5ff(a, b, c, d, x[i + 4], 7, 0xf57c0faf);
      d = md5ff(d, a, b, c, x[i + 5], 12, 0x4787c62a);
      c = md5ff(c, d, a, b, x[i + 6], 17, 0xa8304613);
      b = md5ff(b, c, d, a, x[i + 7], 22, 0xfd469501);
      a = md5ff(a, b, c, d, x[i + 8], 7, 0x698098d8);
      d = md5ff(d, a, b, c, x[i + 9], 12, 0x8b44f7af);
      c = md5ff(c, d, a, b, x[i + 10], 17, 0xffff5bb1);
      b = md5ff(b, c, d, a, x[i + 11], 22, 0x895cd7be);
      a = md5ff(a, b, c, d, x[i + 12], 7, 0x6b901122);
      d = md5ff(d, a, b, c, x[i + 13], 12, 0xfd987193);
      c = md5ff(c, d, a, b, x[i + 14], 17, 0xa679438e);
      b = md5ff(b, c, d, a, x[i + 15], 22, 0x49b40821);

      a = md5gg(a, b, c, d, x[i + 1], 5, 0xf61e2562);
      d = md5gg(d, a, b, c, x[i + 6], 9, 0xc040b340);
      c = md5gg(c, d, a, b, x[i + 11], 14, 0x265e5a51);
      b = md5gg(b, c, d, a, x[i + 0], 20, 0xe9b6c7aa);
      a = md5gg(a, b, c, d, x[i + 5], 5, 0xd62f105d);
      d = md5gg(d, a, b, c, x[i + 10], 9, 0x02441453);
      c = md5gg(c, d, a, b, x[i + 15], 14, 0xd8a1e681);
      b = md5gg(b, c, d, a, x[i + 4], 20, 0xe7d3fbc8);
      a = md5gg(a, b, c, d, x[i + 9], 5, 0x21e1cde6);
      d = md5gg(d, a, b, c, x[i + 14], 9, 0xc33707d6);
      c = md5gg(c, d, a, b, x[i + 3], 14, 0xf4d50d87);
      b = md5gg(b, c, d, a, x[i + 8], 20, 0x455a14ed);
      a = md5gg(a, b, c, d, x[i + 13], 5, 0xa9e3e905);
      d = md5gg(d, a, b, c, x[i + 2], 9, 0xfcefa3f8);
      c = md5gg(c, d, a, b, x[i + 7], 14, 0x676f02d9);
      b = md5gg(b, c, d, a, x[i + 12], 20, 0x8d2a4c8a);

      a = md5hh(a, b, c, d, x[i + 5], 4, 0xfffa3942);
      d = md5hh(d, a, b, c, x[i + 8], 11, 0x8771f681);
      c = md5hh(c, d, a, b, x[i + 11], 16, 0x6d9d6122);
      b = md5hh(b, c, d, a, x[i + 14], 23, 0xfde5380c);
      a = md5hh(a, b, c, d, x[i + 1], 4, 0xa4beea44);
      d = md5hh(d, a, b, c, x[i + 4], 11, 0x4bdecfa9);
      c = md5hh(c, d, a, b, x[i + 7], 16, 0xf6bb4b60);
      b = md5hh(b, c, d, a, x[i + 10], 23, 0xbebfbc70);
      a = md5hh(a, b, c, d, x[i + 13], 4, 0x289b7ec6);
      d = md5hh(d, a, b, c, x[i + 0], 11, 0xeaa127fa);
      c = md5hh(c, d, a, b, x[i + 3], 16, 0xd4ef3085);
      b = md5hh(b, c, d, a, x[i + 6], 23, 0x04881d05);
      a = md5hh(a, b, c, d, x[i + 9], 4, 0xd9d4d039);
      d = md5hh(d, a, b, c, x[i + 12], 11, 0xe6db99e5);
      c = md5hh(c, d, a, b, x[i + 15], 16, 0x1fa27cf8);
      b = md5hh(b, c, d, a, x[i + 2], 23, 0xc4ac5665);

      a = md5ii(a, b, c, d, x[i + 0], 6, 0xf4292244);
      d = md5ii(d, a, b, c, x[i + 7], 10, 0x432aff97);
      c = md5ii(c, d, a, b, x[i + 14], 15, 0xab9423a7);
      b = md5ii(b, c, d, a, x[i + 5], 21, 0xfc93a039);
      a = md5ii(a, b, c, d, x[i + 12], 6, 0x655b59c3);
      d = md5ii(d, a, b, c, x[i + 3], 10, 0x8f0ccc92);
      c = md5ii(c, d, a, b, x[i + 10], 15, 0xffeff47d);
      b = md5ii(b, c, d, a, x[i + 1], 21, 0x85845dd1);
      a = md5ii(a, b, c, d, x[i + 8], 6, 0x6fa87e4f);
      d = md5ii(d, a, b, c, x[i + 15], 10, 0xfe2ce6e0);
      c = md5ii(c, d, a, b, x[i + 6], 15, 0xa3014314);
      b = md5ii(b, c, d, a, x[i + 13], 21, 0x4e0811a1);
      a = md5ii(a, b, c, d, x[i + 4], 6, 0xf7537e82);
      d = md5ii(d, a, b, c, x[i + 11], 10, 0xbd3af235);
      c = md5ii(c, d, a, b, x[i + 2], 15, 0x2ad7d2bb);
      b = md5ii(b, c, d, a, x[i + 9], 21, 0xeb86d391);

      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }

  function binl2hex(binarray) {
    let hexTab = "0123456789abcdef";
    let str = "";
    for (let i = 0; i < binarray.length * 4; i++) {
      str +=
        hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
        hexTab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
    }
    return str;
  }

  function coreMD5(str) {
    // UTF-8
    let x = [];
    let i;
    for (i = 0; i < str.length * 8; i += 8) {
      x[i >> 5] |= (str.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return binlMD5(x, str.length * 8);
  }

  return function (str) {
    return binl2hex(coreMD5(str));
  };
})();

// Base64 Encoding/Decoding
export const encodeBase64 = (text) => {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (e) {
    console.error("Error encoding Base64:", e);
    return null; // Or throw error
  }
};

export const decodeBase64 = (encodedText) => {
  try {
    return decodeURIComponent(escape(atob(encodedText)));
  } catch (e) {
    console.error("Error decoding Base64:", e);
    return null; // Or throw error
  }
};

// URLBase64 Encoding/Decoding
export const encodeURLBase64 = (text) => {
  try {
    let base64 = btoa(unescape(encodeURIComponent(text)));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (e) {
    console.error("Error encoding URLBase64:", e);
    return null;
  }
};

export const decodeURLBase64 = (encodedText) => {
  try {
    encodedText = encodedText.replace(/-/g, "+").replace(/_/g, "/");
    while (encodedText.length % 4) {
      encodedText += "=";
    }
    return decodeURIComponent(escape(atob(encodedText)));
  } catch (e) {
    console.error("Error decoding URLBase64:", e);
    return null;
  }
};

// Hashing functions using Web Crypto API and MD5
const arrayBufferToHex = (buffer) => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const generateHash = async (text, algorithm) => {
  if (!text) return "";
  try {
    const upperAlgorithm = algorithm.toUpperCase();
    if (upperAlgorithm === "MD5") {
      return md5(text);
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(upperAlgorithm, data);
    return arrayBufferToHex(hashBuffer);
  } catch (error) {
    console.error(`Error generating ${algorithm} hash:`, error);
    throw error; // Re-throw to be caught by the component
  }
};
