// A JongseongCode is an integer[0...27].
//   - Each code represents a tail consonants.
//     code  |  e.g.
//    -------+------
//       0   |   가
//       1   |   각
//       2   |   갂
//       3   |   갃
//       4   |   간
//       5   |   갅
//       6   |   갆
//       7   |   갇
//       8   |   갈
//       9   |   갉
//      10   |   갊
//      11   |   갋
//      12   |   갌
//      13   |   갍
//      14   |   갎
//      15   |   갏
//      16   |   감
//      17   |   갑
//      18   |   값
//      19   |   갓
//      20   |   갔
//      21   |   강
//      22   |   갖
//      23   |   갗
//      24   |   갘
//      25   |   같
//      26   |   갚
//      27   |   갛

// _codeForHangul :: string -> JongseongCode
// Given a Hangul letter, computes its jongseong code.
// Assume h is a single letter Hangul string (가-힣).
//   - 44032 (AC00) is the code point of 가, which is the first Hangul letter.
//   - 28 = the number of the jongseongs + 1
const _codeForHangul = h =>
  (h.charCodeAt(0) - 44032) % 28

// code :: string -> JongseongCode
// Given a string of zeros, returns its jongseong code.
// e.g. _codeForZeros('00') === 1    (100 = 백)
//   the number |
//   of zeros   |
//   -----------+-------
//       1      |  십
//       2      |  백
//       3      |  천
//     4 ~ 7    |  만
//     8 ~ 11   |  억
//    12 ~ 15   |  조
//    16 ~ 19   |  경
//    20 ~ 23   |  해
const _codeForZeros = zs => {
  const n = zs.length

  if (n === 1) {
    return 17
  }
  if (n === 2 || (n >= 8 && n <= 11)) {
    return 1
  }
  if (n >= 3 && n <= 7) {
    return 4
  }
  if ((n >= 12 && n <= 15) || (n >= 20 && n <= 23)) {
    return 0
  }
  if (n >= 16 && n <= 19) {
    return 21
  }

  throw new Error("It's too large.")
}

// _codeForDigit :: string -> JongseongCode
// Given a digit, returns its jongseong code.
// Assume d is one of: '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
const _codeForDigit = d =>
  [21, 8, 0, 16, 0, 0, 1, 8, 8, 0][d]

// _codeForEnglish :: string -> JongseongCode
// Given a two-letter English string, returns its jongseong code.
// Assume e is a two-letter English string.
const _codeForEnglish = e =>
    /ck/i.test(e) ? 1
  : /.n/i.test(e) ? 4
  : /ne/i.test(e) ? 4
  : /.l/i.test(e) ? 8
  : /le/i.test(e) ? 8
  : /.m/i.test(e) ? 16
  : /ob/i.test(e) ? 17
  : /.p/i.test(e) ? 17
  : /et/i.test(e) ? 19
  : /ng/i.test(e) ? 21
  : /* else      */ 0

// _codeForEnglishInitial :: string -> JongseongCode
// Given an English letter, returns its jongseong code.
// Assume e is a single-letter English string.
const _codeForEnglishInitial = e => {
  switch (e.toLowerCase()) {
    case 'l':
    case 'r':
      return 8
    case 'm':
      return 16
    case 'n':
      return 4
    default:
      return 0
  }
}

// code :: string -> JongseongCode
// Computes the jongseong code of a given string.
// If there isn't any recognizable letter in word, returns 0 (no jongseong).
const code = word => {
  if (!word) {
    return 0
  }

  // !!! Ignore letters inside parentheses.
  const w = word.replace(/\([^)]*\)$/, '')
  const last = w[w.length - 1]

  if (/[가-힣]/.test(last)) {
    return _codeForHangul(last)
  }

  if (/[1-9]0+$/.test(w)) {
    const zerosMatch = /0+$/.exec(w)

    return _codeForZeros(zerosMatch[0])
  }

  if (/\d/.test(last)) {
    return _codeForDigit(last)
  }

  if (/[a-z]{2}$/i.test(w)) {
    return _codeForEnglish(w.slice(w.length - 2, w.length))
  }

  if (/(?:^|[^a-z])[a-z]$/i.test(w)) {
    return _codeForEnglishInitial(last)
  }

  if (/(^|[^a-z])[a-z][^a-z]?$/i.test(w)) {
    return _codeForEnglishInitial(w[w.length - 2])
  }

  return code(w.slice(0, w.length - 1))
}

// hasJongseong :: string -> boolean
// Does the last letter of a given word have a jongseong?
const hasJongseong = w =>
  code(w) !== 0

module.exports = {
  _codeForHangul,
  _codeForZeros,
  _codeForDigit,
  _codeForEnglish,
  _codeForEnglishInitial,
  code,
  hasJongseong
}
