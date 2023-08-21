function app(target: Function) {
    console.log("执行 @app 类装饰器");
}

@app
class MainApp {}
