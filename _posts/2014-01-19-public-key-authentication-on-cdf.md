---
layout: post
title:  Public Key Authentication on CDF
date:   2014-01-19 12:00:00
comments: true
---

All the time, I see people entering their [CDF](http://www.cdf.toronto.edu/) password every time they connect via SSH. Instead of password authentication, you can use an SSH key pair to authenticate automatically.

### OS X / *nix using OpenSSH

#### Generate your key pair. (Skip if you already have one).

Use `ssh-keygen` to generate your SSH private/public key pair:

```bash
ssh-keygen -t rsa -C "g3spence"
```

The output will look something like this:

```
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/Spencer/.ssh/id_rsa):
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /Users/Spencer/.ssh/id_rsa.
Your public key has been saved in /Users/Spencer/.ssh/id_rsa.pub.
The key fingerprint is:
48:f4:98:ad:af:a8:1e:18:38:fe:95:ce:de:fa:6d:07 g3spence
The key's randomart image is:
+--[ RSA 2048]----+
|      .          |
|     . =         |
|      + o        |
|.    . o         |
|+     o S        |
|.+    .. E       |
|...  o  . .      |
|  ..+..... .     |
| .ooo=+o...      |
+-----------------+
```

#### Copy your public key onto CDF.

Your public key is by default stored in the file `~/.ssh/id_rsa.pub`. We need to copy the contents of this file into a file on CDF, `~/.ssh/authorized_keys` so that CDF knows that your key pair is allowed to log into your CDF account.

```bash
cat ~/.ssh/id_rsa.pub | ssh g3spence@cdf.toronto.edu "cat >> ~/.ssh/authorized_keys"
```

Now when you connect to CDF, `ssh` should use your private key `~/.ssh/id_rsa` to authenticate and will not ask for your password. Perfect!


### Windows using PuTTY

#### Generate your key pair. (Skip if you already have one).

Use [PuTTYgen][putty-download] to generate your SSH private/public key pair. Open PuTTYgen and click the *Generate* button:

![PuTTYgen](/assets/puttygen01.png)

At this point, PuTTYgen will ask you to move your mouse around over the window, which creates some entropy to make the key a bit more secure.

Optionally change the *Key comment* to something useful like your CDF username, then click *Save private key* and click *Yes* when PuTTYgen asks you to save without a passphrase. You can save the key anywhere you like, but I recommend `%UserProfile%\.ssh\id_rsa.ppk` just to be consistent with OpenSSH.

(Note: You cannot create directories with a leading `.` in Windows Explorer. Open `cmd.exe` and run `mkdir %UserProfile%\.ssh` to create the directory.)

![PuTTYgen](/assets/puttygen02.png)

#### Copy your public key onto CDF.

Your public key is displayed in the section of the PuTTYgen window *Public key for pasting into OpenSSH authorized_keys file*. We need to copy the contents of this file into a file on CDF, `~/.ssh/authorized_keys` so that CDF knows that your key pair is allowed to log into your CDF account.

![PuTTYgen](/assets/puttygen03.png)

Copy the entire string to your clipboard.

Connect to CDF in PuTTY using your password:

![PuTTY](/assets/putty01.png)

Create `~/.ssh/authorized_keys` by pasting your public key into an  
`echo "..." >> authorized_keys` command:

```bash
cd .ssh/
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCiaF1qSlz3YI7bZueQG8lB8D7QukZfBhyncowtSrGwINInz4RFg9V2wbbnqxfs6SBBXAOQ5Nor/98gHWULhSKrE1bJ1f7/yivl5b7U36QJ/zG9mozWf5G8t0OFVyEW4uGbeJYcm5GSC9yyViIvCUPG1gY1mXHcFsCscQfBpkC5BxyuAX1mi39rscP3QFHt8j7Ybv7k481tzUSAaB3X/cRR7tNLEay9+4RTgm7X85aiWnmAuhEvjRB5+DrBm/JMqhR0qF6pJr+snHbEkliuxZc2KsqCJqxvO8NW7wiTPRKKlAWnoMFA+qIU318nntR6GDlaVKc/v15cr3HEBRvdiUtR g3spence" >> authorized_keys
```

Finally, log out:

```bash
exit
```

#### Add a saved session to PuTTY that uses your CDF username and private key to log in automatically.

Set your username in *Connection* -> *Data*:

![PuTTY](/assets/putty02.png)

Set your private key in *Connection* -> *SSH* -> *Auth*:

![PuTTY](/assets/putty03.png)

Create a saved session:

![PuTTY](/assets/putty04.png)

Now when you open PuTTY, all you need to do is double-click the name of your saved session (in my case, *cdf*) and you'll be logged in automatically. Perfect!

Note: Since we created a private key *without* a passphrase, it's very important that you protect your private key, `id_rsa` or `id_rsa.ppk`. If anyone gains access to this file, they will be able to log into your CDF account!

[putty-download]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
