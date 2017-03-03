# fpm-plugin-emailer
fpm-server的邮件推送插件

# CHANGELOG

- Use nunjucks template

# Install

```bash
$ npm i fpm-plugin-emailer --save
```

# Dependence Config

```javascript
{
  ...
  email: {
    "service": "qq",
    "user": "88888888@qq.com",
    "pass": "88888888"
  }
  ...
}

```

# Use It

`fpm.emailer.send(options, callback)`
```javascript
var email = {
  to: 'xxxx@xx.com',
  subject: 'this is a title',
  template: 'hellow {{ name }}', //use nunjucks template enginer
  data: {name: 'jack'}
};
fpm.emailer.send(email, function(err, res){
  //code the callback here
})
```

