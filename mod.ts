export class Base64Url {
  #encoder = new TextEncoder();
  #decoder = new TextDecoder();

  #btoa_table =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

  encode(str: string): string {
    const uint8str = this.#encoder.encode(str);
    let res = "";

    let carry = 0;
    for (let i = 0; i < uint8str.length; i++) {
      const target = uint8str[i];
      const shift = ((i % 3) + 1) * 2; // 2, 4, 6, 2, ...

      const value = carry + (target >>> shift);
      carry = (target << (6 - shift)) & 0b111111;

      res += this.#btoa_table[value];
      if (shift == 6) {
        res += this.#btoa_table[carry];
        carry = 0;
      }
    }
    if (carry) {
      res += this.#btoa_table[carry];
    }

    return res;
  }

  decode(str: string): string {
    const uint8str = this.#encoder.encode(str);
    const res = new Uint8Array((uint8str.length * 6) / 8);

    let carry = 0;
    for (let [i, j] = [0, 0]; i < uint8str.length; i++) {
      const target = this.#atob(uint8str[i]);
      const shift = (3 - (i % 4)) * 2; // 6, 4, 2, 0, 6, ...

      const value = carry + (target >>> shift);
      carry = (target << (8 - shift)) & 0b11111111;

      if (value) {
        res[j++] = value;
      }
    }

    return this.#decoder.decode(res);
  }

  #atob(x: number): number {
    if (x === 45) {
      return 62; // '-'
    } else if (x === 95) {
      return 63; // '_'
    } else if (x <= 57) {
      return x + 4; // '0' <= x <= '9'
    } else if (x <= 90) {
      return x - 65; // 'A' <= x <= 'Z'
    } else {
      return x - 71; // 'a' <= x <= 'z'
    }
  }
}
