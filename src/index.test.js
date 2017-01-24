/* eslint-env mocha */

import { assert } from 'chai'

import {
  _codeForHangul,
  _codeForZeros,
  _codeForDigit,
  _codeForEnglish,
  _codeForEnglishInitial,
  code,
  hasJongseong
} from './index'

describe('_codeForHangul()', () => {
  it('computes the jongseong code of a Hangul letter', () => {
    assert.equal(_codeForHangul('가'), 0)
    assert.equal(_codeForHangul('납'), 17)
    assert.equal(_codeForHangul('닿'), 27)
  })
})

describe('_codeForZeros()', () => {
  it('returns the jongseong code of a number that ends with a given string of zeros', () => {
    assert.equal(_codeForZeros('0'), 17)                    // 십
    assert.equal(_codeForZeros('00'), 1)                    // 백
    assert.equal(_codeForZeros('000'), 4)                   // 천
    assert.equal(_codeForZeros('0000'), 4)                  // 만
    assert.equal(_codeForZeros('00000000'), 1)              // 억
    assert.equal(_codeForZeros('000000000000'), 0)          // 조
    assert.equal(_codeForZeros('0000000000000000'), 21)     // 경
    assert.equal(_codeForZeros('00000000000000000000'), 0)  // 해
  })

  it('throws an error if there are too many zeros', () => {
    assert.throws(
      () => { _codeForZeros('000000000000000000000000') },
      /It's too large/
    )
  })
})

describe('_codeForDigit()', () => {
  it('returns the jongseong code of a given digit', () => {
    assert.equal(_codeForDigit('0'), 21)
    assert.equal(_codeForDigit('1'), 8)
    assert.equal(_codeForDigit('2'), 0)
    assert.equal(_codeForDigit('3'), 16)
    assert.equal(_codeForDigit('4'), 0)
    assert.equal(_codeForDigit('5'), 0)
    assert.equal(_codeForDigit('6'), 1)
    assert.equal(_codeForDigit('7'), 8)
    assert.equal(_codeForDigit('8'), 8)
    assert.equal(_codeForDigit('9'), 0)
  })
})

describe('_codeForEnglish()', () => {
  it('returns the jongseong code of a given two-letter English string', () => {
    assert.equal(_codeForEnglish('ck'), 1)
    assert.equal(_codeForEnglish('on'), 4)
    assert.equal(_codeForEnglish('ne'), 4)
    assert.equal(_codeForEnglish('al'), 8)
    assert.equal(_codeForEnglish('le'), 8)
    assert.equal(_codeForEnglish('om'), 16)
    assert.equal(_codeForEnglish('up'), 17)
    assert.equal(_codeForEnglish('et'), 19)
    assert.equal(_codeForEnglish('ng'), 21)
    assert.equal(_codeForEnglish('ob'), 17)
  })
})

describe('_codeForEnglishInitial()', () => {
  it('returns the jongseong code of a given English letter', () => {
    assert.equal(_codeForEnglishInitial('l'), 8)
    assert.equal(_codeForEnglishInitial('r'), 8)
    assert.equal(_codeForEnglishInitial('m'), 16)
    assert.equal(_codeForEnglishInitial('n'), 4)
    assert.equal(_codeForEnglishInitial('x'), 0)
  })
})

describe('code()', () => {
  it('computes the jongseong code of a given string', () => {
    assert.equal(code('탐정'), 21)
    assert.equal(code('500'), 1)
    assert.equal(code('7'), 8)
    assert.equal(code('coffee'), 0)
    assert.equal(code('L'), 8)
    assert.equal(code('A.P.I.'), 0)
    assert.equal(code('!@#'), 0)
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
