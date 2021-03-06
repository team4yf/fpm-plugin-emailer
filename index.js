var nodemailer = require('nodemailer');
var _ = require('lodash');
var nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });

module.exports = {
  bind: function(fpm){
    fpm.registerAction('INIT', function () {
      console.log('emailer-plugin start');
      var c = fpm.getConfig();
      var emailOption = _.assign({}, c.email || {});
      var transporter;
      var initOptions;
      fpm.emailer = {
        init: function(options){
          options = options || {};
          initOptions = options;
          transporter = nodemailer.createTransport({
              //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
              service: options.service,
              port: 465, // SMTP 端口
              secureConnection: true, // 使用 SSL
              auth: {
                  user: options.user,
                  pass: options.pass
              }
          });
        },
        send: function(options, callback){
          if(!transporter){
            callback('error: has not init mailer transporter');
            return;
          }
          var result = nunjucks.renderString(options.template, options.data);
          options = options || {};
          var mailOptions = {
              from: initOptions.user, // 发件地址
              to: options.to, // 收件列表
              subject: options.subject, // 标题
              //text和html两者只支持一种
              text: result  ,
              html: result // html 内容
          };
          // send mail with defined transport object
          transporter.sendMail(mailOptions, function(error, info){
              if(error){
                  callback(error)
              }else{
                callback(null, 'Message sent: ' + info.response)
              }

          });
        }
      };
      fpm.emailer.init(emailOption);
    });
  }
}
