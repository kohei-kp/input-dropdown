# jquery.input-dropdown

### Installation ###
テキストボックスにドロップダウンをつける。

### Usage ###

```html
<input id="input-sample">
```
```javascript
const userList = [
    { name: 'Alice', age: 18 },
    { name: 'Bob', age: 21 },
    { name: 'Mallory', age: 25 }
]

$('#input-sample').inputDropdown({
  data: userList,
  formatter: user => {
    return `<li username=${user.name}>$user.name}(${user.age})</li>`
  },
  valueKey: 'username'
}
```

### Options ###
* formatter: function
* valueKey: 取得するデータのキー
* maxHeight: ドロップダウンの高さ
* color: テキストの色
* fontSize: フォントサイズ
* background: 背景色

### License ###  
MIT
