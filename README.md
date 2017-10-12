
利用angular2 and ionic2制作类似外卖点餐的手机App

<h2>怎么运行在电脑端（ionic2自行百度安装运行环境<a target="_blank" href="https://segmentfault.com/a/1190000010194942">运行环境可以参考这篇文章</a>）</h2>

<ul>
  <li>先运行命令git clone  项目地址(git clone https://github.com/licongwen/shop_order.git)  将项目克隆到本地</li>
  <li>cd到项目路径，运行npm install安装所有的依赖包</li>
  <li>运行ionic serve 会使项目在本地localhost：8100运行。可以在浏览器地址栏后加上 /ionic-lab 运行在手机模式下</li>
</ul>

<h2>打包成App</h2>
<ul>
  <li>先运行命令添加Android平台：ionic platform add android</li>
  <li>生成调试的app：ionic build android</li>
  <li>生成release的未签名的app：cordova build --release android（未签名的app不能在手机端安装）</li>
</ul>

<h2>App签名</h2>

   1. 创建key:需要用到keytool.exe（位于jdk1.6.0——24\jre\bin目录下），使用产生的key对apk签名用到的是jarsigner.exe（位于jdk1.6.0_24\bin目录下）， 把上两个软件所在的目录添加到环境变量path后，打开cmd输入：
    ![image](https://github.com/licongwen/shop_order/blob/master/src/assets/img/pic1.png)
    
    （PS：-genkey 产生密钥 -alias demo.keystore 产生的密钥，demo可修改 -keyalg RSA 使用RSA算法对签名加密 -validity 40000有效期限40000天）

  输入命令后可以得到下面的输入页面：按照自己的实际情况填写。随后会在项目的根目录下生成demo.keystore密钥。
  
  ![image](https://github.com/licongwen/shop_order/blob/master/src/assets/img/pic2.png)
  
   2. 使用步骤1中产生的key对App进行签名:
   
   将生成的apk和demo.keystore放在同一文件夹下。在cmd中输入如下的命令：完成后即可得到签名好的Apk 
   
   ![image](https://github.com/licongwen/shop_order/blob/master/src/assets/img/pic3.png)

（PS：-verbose 输出签名的详细信息 -keystore  demo.keystore 密钥库的位置 -signedjar demor_signed.apk demo.apk.keystore 正式签名，三个参数中依次为签名户产生的文件demo_signed，要签名的文件demo.apk和密钥库demo.keystore。）

<h2>修改App应用的图标和启动画面</h2>

在项目的根目录下，有一个resources的文件夹，分别存放着应用的图标和启动的画面，将这些图标替换成自己喜欢的就ok了。

![image](https://github.com/licongwen/shop_order/blob/master/src/assets/img/pic5.png)

随后在cmd命令行工具中运行 ：

![image](https://github.com/licongwen/shop_order/blob/master/src/assets/img/pic4.png)

icon.png为app图标，splash.png为启动画面。












