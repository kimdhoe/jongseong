/* eslint-env mocha */

import { assert } from 'chai'

const { jongseongHangul
      , jongseongZeros
      , jongseongDigit
      , jongseongEnglish
      , jongseongEnglishInitial
      , jongseong
      , hasJongseong
      } = require('./index')

describe('jongseongHangul()', () => {
  it('computes the jongseong code of a Hangul letter', () => {
    assert.equal(jongseongHangul('가'),  0)
    assert.equal(jongseongHangul('납'), 17)
    assert.equal(jongseongHangul('닿'), 27)
  })
})

describe('jongseongZeros()', () => {
  it('returns the jongseong code of a number that ends with a given string of zeros', () => {
    assert.equal(jongseongZeros('0'),                    17)  // 십
    assert.equal(jongseongZeros('00'),                    1)  // 백
    assert.equal(jongseongZeros('000'),                   4)  // 천
    assert.equal(jongseongZeros('0000'),                  4)  // 만
    assert.equal(jongseongZeros('00000000'),              1)  // 억
    assert.equal(jongseongZeros('000000000000'),          0)  // 조
    assert.equal(jongseongZeros('0000000000000000'),     21)  // 경
    assert.equal(jongseongZeros('00000000000000000000'),  0)  // 해
  })

  it('throws an error if there are too many zeros', () => {
    assert.throws( () => { jongseongZeros('000000000000000000000000') }
                 , /It's too large/
                 )
  })
})

describe('jongseongDigit()', () => {
  it('returns the jongseong code of a given digit', () => {
    assert.equal(jongseongDigit('0'), 21)
    assert.equal(jongseongDigit('1'),  8)
    assert.equal(jongseongDigit('2'),  0)
    assert.equal(jongseongDigit('3'), 16)
    assert.equal(jongseongDigit('4'),  0)
    assert.equal(jongseongDigit('5'),  0)
    assert.equal(jongseongDigit('6'),  1)
    assert.equal(jongseongDigit('7'),  8)
    assert.equal(jongseongDigit('8'),  8)
    assert.equal(jongseongDigit('9'),  0)
  })
})

describe('jongseongEnglish()', () => {
  it('returns the jongseong code of a given two-letter English string', () => {
    assert.equal(jongseongEnglish('ck'),  1)
    assert.equal(jongseongEnglish('on'),  4)
    assert.equal(jongseongEnglish('ne'),  4)
    assert.equal(jongseongEnglish('al'),  8)
    assert.equal(jongseongEnglish('le'),  8)
    assert.equal(jongseongEnglish('om'), 16)
    assert.equal(jongseongEnglish('up'), 17)
    assert.equal(jongseongEnglish('et'), 19)
    assert.equal(jongseongEnglish('ng'), 21)
    assert.equal(jongseongEnglish('ob'), 17)
  })
})

describe('jongseongEnglishInitial()', () => {
  it('returns the jongseong code of a given English letter', () => {
    assert.equal(jongseongEnglishInitial('l'),  8)
    assert.equal(jongseongEnglishInitial('r'),  8)
    assert.equal(jongseongEnglishInitial('m'), 16)
    assert.equal(jongseongEnglishInitial('n'),  4)
    assert.equal(jongseongEnglishInitial('x'),  0)
  })
})

describe('jongseong()', () => {
  it('computes the jongseong code of a given string', () => {
    assert.equal(jongseong('탐정'),  21)
    assert.equal(jongseong('500'),    1)
    assert.equal(jongseong('7'),      8)
    assert.equal(jongseong('coffee'), 0)
    assert.equal(jongseong('L'),      8)
    assert.equal(jongseong('A.P.I.'), 0)
    assert.equal(jongseong('!@#'),    0)
  })
})

describe('hasJongseong()', () => {
  it('checks whether the last letter of a given word has a jongseong', () => {
    assert.isTrue(hasJongseong('탐정'))
    assert.isFalse(hasJongseong('코드'))
    assert.isTrue(hasJongseong('apple'))
    assert.isTrue(hasJongseong('tom'))
    assert.isFalse(hasJongseong('code'))
    assert.isFalse(hasJongseong('A.P.I.'))
    assert.isTrue(hasJongseong('L'))
    assert.isFalse(hasJongseong('12'))
    assert.isTrue(hasJongseong('13'))
    assert.isTrue(hasJongseong('120'))
  })
})
