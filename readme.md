# 종성 jongseong

[![Travis](https://img.shields.io/travis/kimdhoe/jongseong.svg)](https://travis-ci.org/kimdhoe/jongseong)
[![Codecov](https://img.shields.io/codecov/c/github/kimdhoe/jongseong.svg)](https://codecov.io/gh/kimdhoe/jongseong)
[![npm](https://img.shields.io/npm/v/jongseong.svg)](https://www.npmjs.com/package/jongseong)
[![license](https://img.shields.io/github/license/kimdhoe/jongseong.svg)](https://github.com/kimdhoe/jongseong/blob/master/LICENSE.md)
[![Standard - JavaScript Style
Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

한글 글자의 받침을 확인합니다.

## Install

```shell
$ npm install --save jongseong
```

## Usage

```js
const { code, hasJongseong } = require('jongseong')
```

## API

### code(word)

마지막 글자의 받침 코드(0...27)를 반환합니다.

#### word

_Required_
Type: `string`

```js
code('가나다')  // =>  0
code('가나닥')  // =>  1
code('가나닶')  // => 18
code('가나닿')  // => 27
code('112')     // =>  0  (백십이)
code('113')     // => 16  (백십삼)
code('100')     // =>  1  (백)
```

### hasJongseong(word)

마지막 글자에 받침이 있는지 여부를 반환합니다.

#### word

_Required_
Type: `string`

```js
hasJongseong('커피')  // => false
hasJongseong('코딩')  // => true
hasJongseong('105')  // => false  (백오)
hasJongseong('100')  // => true  (백)
```

## 받침 코드

받침 코드는 0부터 27까지의 정수입니다.

| 코드 | 받침 | 예시 |
|:----:|:----:|:----:|
|  0   |  -   | 가   |
|  1   |  ㄱ  | 각   |
|  2   |  ㄱㄱ| 갂   |
|  3   |  ㄱㅅ| 갃   |
|  4   |  ㄴ  | 간   |
|  5   |  ㄴㅈ| 갅   |
|  6   |  ㄴㅎ| 갆   |
|  7   |  ㄷ  | 갇   |
|  8   |  ㄹ  | 갈   |
|  9   |  ㄹㄱ| 갉   |
| 10   |  ㄹㅁ| 갊   |
| 11   |  ㄹㅂ| 갋   |
| 12   |  ㄹㅅ| 갌   |
| 13   |  ㄹㅌ| 갍   |
| 14   |  ㄹㅍ| 갎   |
| 15   |  ㄹㅎ| 갏   |
| 16   |  ㅁ  | 감   |
| 17   |  ㅂ  | 갑   |
| 18   |  ㅂㅅ| 값   |
| 19   |  ㅅ  | 갓   |
| 20   |  ㅅㅅ| 갔   |
| 21   |  ㅇ  | 강   |
| 22   |  ㅈ  | 갖   |
| 23   |  ㅊ  | 갗   |
| 24   |  ㅋ  | 갘   |
| 25   |  ㅌ  | 같   |
| 26   |  ㅍ  | 갚   |
| 27   |  ㅎ  | 갛   |

## License

MIT © Kim Donghee
