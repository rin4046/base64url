import { assertEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts";

import { Base64Url } from "./mod.ts";

const base64Url = new Base64Url();

const str = `わが日の本は島国よ
朝日かがよう海に
連りそばだつ島々なれば
あらゆる国より舟こそ通え

されば港の数多かれど
この横浜にまさるあらめや
むかし思えばとま屋の煙
ちらりほらりと立てりしところ

今はもも舟もも千舟
泊るところぞ見よや
果なく栄えて行くらんみ代を
飾る宝も入りくる港`;

const base64str =
  "44KP44GM5pel44Gu5pys44Gv5bO25Zu944KICuacneaXpeOBi-OBjOOCiOOBhua1t-OBqwrpgKPjgorjgZ3jgbDjgaDjgaTls7bjgIXjgarjgozjgbAK44GC44KJ44KG44KL5Zu944KI44KK6Iif44GT44Gd6YCa44GICgrjgZXjgozjgbDmuK_jga7mlbDlpJrjgYvjgozjgakK44GT44Gu5qiq5rWc44Gr44G-44GV44KL44GC44KJ44KB44KECuOCgOOBi-OBl-aAneOBiOOBsOOBqOOBvuWxi-OBrueFmQrjgaHjgonjgorjgbvjgonjgorjgajnq4vjgabjgorjgZfjgajjgZPjgo0KCuS7iuOBr-OCguOCguiIn-OCguOCguWNg-iInwrms4rjgovjgajjgZPjgo3jgZ7opovjgojjgoQK5p6c44Gq44GP5qCE44GI44Gm6KGM44GP44KJ44KT44G_5Luj44KSCumjvuOCi-WuneOCguWFpeOCiuOBj-OCi-a4rw";

Deno.test("Encode Test", () => {
  const encoded = base64Url.encode(str);
  assertEquals(encoded, base64str);
});

Deno.test("Decode Test", () => {
  const decoded = base64Url.decode(base64str);
  assertEquals(decoded, str);
});

Deno.test("Encode and Decode Test", () => {
  const encoded = base64Url.encode(str);
  const decoded = base64Url.decode(encoded);
  assertEquals(decoded, str);
});
