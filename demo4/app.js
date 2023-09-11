const express = require('express');

const app = express();
const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',          //用户名
    password: '123456',	//密码
    host: 'localhost',		//主机（默认都是local host）
    database: 'node_demo'       //数据库名
})
app.use(express.urlencoded({ extended: true }));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

db.connect(err => { //检测

})
// 开启服务器
app.listen(3000, () => {
})
const Detection=/^(?=.*[a-zA-Z])(?=.*\\d).{1,9}$///正则表达式 检测密码 至少包含字母、数字，1-9位

    app.post('/add', (req, res) => {
        const { name, password } = req.body;
        //先查询是否存在
        let sqlname = `SELECT * FROM node WHERE name='${name}'`
        db.query(sqlname, (err, data) => {
            if (data.length!==0) {
          console.log(typeof data)
           res.send('用户名已存在')
            }
            else {
                if(Detection.exec(password)!==null) {
                    let sqlStr = `INSERT INTO node ( name, password )VALUES('${name}','${password}')`

                    db.query(sqlStr, (err) => {
                        console.log(err,)
                    })
                    //成功后的页面显示
                    res.send('插入成功')
                }
                else{
                    res.send('密码 至少包含字母、数字，1-9位')
                }
            }
        })
    })


    app.post('/login', (req, res) => {
        const name = req.body.username; // 获取用户名字段的值
        const password = req.body.password;
        console.log(name, password)

        let sqlname = `SELECT * FROM node WHERE name='${name}'`
        db.query(sqlname, (err, data) => {
            if (data.length === 0) {
                res.send('用户名不存在')

            } else {
                if (data[0].password === password) {
                    res.send('登录成功')

                } else {
                    res.send('密码错误')

                }
            }
        })
    })




