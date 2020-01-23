# react-kagawa-pref

![](https://i.imgur.com/ZiPesZj.png)

## インストール

```sh
yarn add https://github.com/mohemohe/react-kagawa-pref.git
```

## 使い方

最小限

```ts
import * as React from "react"
import ReactDOM from "react-dom";
import Kagawa from "react-kagawa-pref";

class App extends React.Component<any, any> {
    public render() {
        return (
            <Kagawa
                open={true}
            />
        );
    }
}

ReactDOM.render(<App/>, document.querySelector("#app"));
```

オプション全指定

```ts
import * as React from "react"
import ReactDOM from "react-dom";
import Kagawa from "react-kagawa-pref";

class App extends React.Component<any, any> {
    constructor(p: any, s: any) {
        super(p, s);
        this.state = {
            open: true,
        };
    }

    public render() {
        return (
            <Kagawa
                open={this.state.open}
                title={"何者だ❗"}
                text={"さてはお主、香川県民ではあるまいな？"}
                yesButtonText={"左様"}
                yesButtonCallback={() => this.setState({open: false})}
                noButtonText={"違いまする"}
                noButtonCallback={() => this.setState({open: false})}
                showDissmiss={true}
                dismissText={"次回より非表示とする"}
                dismissLocalStorageKey={"udon-pref"}
            />
        );
    }
}

ReactDOM.render(<App/>, document.querySelector("#app"));
```

## ライセンス

WTFPL
