# 配置项

名称|意义|类型|默认值
---|---|---|---
debug|是否开启debug模式|Boolean|false
path|保存的路径|String|空字符串
nameMode|文件名方式|Number|1（1随机名称，2默认名称，3自定义名称）
name|自定义名称内容，当nameMode为3时生效|String|空字符串
fileType|文件类型|String|默认img（会校验文件的后缀，校验正则为/\.(png|jpe?g|gif|svg)(\?.*)?$/），暂时不支持其他值
fileSuffix|文件后缀|String|空字符串（当本项不为空时表示只支持本后缀的文件上传）
keySet|阿里云配置项|Object|详见配置项解释


## keySet配置项

名称|意义|类型|默认值
---|---|---|---
key|阿里云的accessKeyId|String|空字符串
secret|阿里云的accessKeySecret|String|空字符串
bucket|阿里云的bucket|String|空字符串
region|阿里云所在区域|String|shanghai

## 事件

名称|说明|参数
---|---|---
error|错误事件|msg
success|上传成功,返回路径和拼接的url|{ossPath,ossUrl}
