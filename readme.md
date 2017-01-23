# 종성 Jongseong

한글 글자의 받침을 확인합니다.

```js
hasJongseong('커피')  // => false
hasJongseong('책')    // => true
```

```js
jongseong('가나다')   // =>  0
jongseong('가나닥')   // =>  1
jongseong('가나닶')   // => 18
jongseong('가나닿')   // => 27
```
