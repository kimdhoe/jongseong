# 종성 Jongseong

[![Travis](https://img.shields.io/travis/kimdhoe/jongseong.svg)](https://travis-ci.org/kimdhoe/jongseong)
[![Codecov](https://img.shields.io/codecov/c/github/kimdhoe/jongseong.svg)](https://codecov.io/gh/kimdhoe/jongseong)

한글 글자의 받침을 확인합니다.

```js
hasJongseong('커피')  // => false
hasJongseong('코딩')  // => true
```

```js
jongseong('가나다')   // =>  0
jongseong('가나닥')   // =>  1
jongseong('가나닶')   // => 18
jongseong('가나닿')   // => 27
```
