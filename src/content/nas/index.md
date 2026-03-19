---
title: Network Attached Storage (NAS), explained in 100 seconds.
date: 2026-03-19
description: What is a NAS (Network Attached Storage) and why do you need one? Learn how a home server can replace Dropbox, iCloud, and Google Drive — beginner-friendly guide.
tags: [tech]
published: true
featuredImage: /images/nas/what_is_a_nas.jpeg                                              
featuredImageAlt: What is network attached storage?
---

I am a paranoid data-hoarder.

There, I said it.

I hear stories of people&#39;s **entire iCloud photo library being accidentally deleted,**&nbsp;and I shiver.

Also, the idea of &quot;running out of storage space&quot; gives me anxiety.&nbsp;

At one point, I was paying for...

- Google Drive storage AND
- Dropbox AND
- iCloud AND
- buying new external hard drives each year AND
- Netflix AND Spotify AND HBO Max AND Prime AND Audible

I pay for none of those now.

Actually we still pay for Netflix because my wife won&#39;t let me cancel. Dadgum Call The Midwife.

ENTER: ***The NAS.***

![What is a NAS?](/images/nas/what_is_a_nas.jpeg)

## What&#39;s a NAS?

Stands for &quot;Network Attached Storage.&quot;

But it&#39;s easier to explain&nbsp;*backwards.*

- STORAGE = hard drives
- ATTACHED = plugged into...
- NETWORK = ...your wifi router

## Right cool beans Pete...but what IS the actual device?

A server (a.k.a. &quot;computer&quot;).

When you hear &quot;SeRvEr&quot;, just think &quot;computer.&quot;

*Let the fancy-pants IT Professionals flame me for that description, but there ya go.*

![My NAS](/images/nas/nas_up_close.jpeg)

Mine hangs out next to my router in my basement. A tiny bit bigger than a toaster.

I forget it&#39;s there--until I need it.

## Boorrriiiing. Who cares?

A NAS can do LOTS of cool things, actually.

### My own personal cloud storage

I moved my stuff OFF of iCloud, Dropbox, and Google Drive&nbsp;👉 onto my NAS.

I can access it from anywhere in the world.&nbsp;

![NAS file finder screenshot](/images/nas/nas_in_finder.png)

### My own media streaming platform

- All my photos
- All my movies &amp; TV shows&nbsp;🏴&zwj;☠️
- All my music

Stored on the NAS.

I use free, open-source software to &quot;consume&quot; that stuff.

- Photos = Immich (and it&#39;s AMAZING)
- Movies/TV = Plex
- Music = Plexamp

Perhaps we&#39;ll talk about&nbsp;*how&nbsp;*I get that media in another email? 🏴&zwj;☠️

### Running software 24/7

I could...

- host my WordPress sites from my &quot;server.&quot;
- install AI LLMs on it.
- put Openclaw on it to have those LLMs operate on their own--24 hours a day.
- automate backups and other stuff to happen overnight.

## Ok &quot;paranoid Pete&quot;, all of your data on a hard drive in your basement? Sounds risky.

Not as long as I stick to the &quot;*3-2-1 Backup Method!*&quot;

- THREE copies of your data
- on TWO different devices
- with at least ONE of them stored off-site.

Here&#39;s my setup:

1. My NAS has an 8TB hard drive. It stores stuff.
2. My NAS has another 8TB &quot;parity&quot; hard drive, sitting right next to the other one.
3. A USB external hard drive, sitting at my mother-n-law&#39;s house.

If a HDD fails, the &quot;parity&quot; is a backup.

If my basement floods, my (backed-up quarterly) external hard drive is the backup.

If my town is nuked and I lose both, I have bigger problems to worry about.

## 3 ways to have your own NAS

### Buy a pre-made one (easiest)

Synology is the go-to. Plug it in, install their app, you&#39;re basically done. More expensive, but simple.

NOTE: Some **pre-mades come with the [actual hard drives](https://amzn.to/4siucr9), but many do NOT.**

- [2-HDD Synology pre-made](http://amzn.to/4bw3yDS) = $275
- [5-HDD Synology pre-made ](http://amzn.to/47SbaQ3)(&quot;top-of-the-line&quot; specs) = $2,000

There are PLENTY around the $200-400 price range! **(If you just cut ONE Dropbox subscription, that&#39;ll pay for itself in no time 💸).**

### Build your own (most fun, what Pete did)

Order parts, watch YouTube, put it together like adult Legos. It WILL take time and patience--but you&#39;ll spend WAY less money than a similarly-featured pre-made.

Mine cost roughly $450, including the hard drives,&nbsp;**and it has roughly the same specs as the $2,000 Synology.&nbsp;**

#humblebrag

### Recycle an old computer (cheapest)

Old desktop in the storage unit (or Goodwill)??

Install Unraid or TrueNAS on it and BOOM. You have a NAS. Great way to dip your toes in before spending a lot.

| &nbsp; | PRE-MADE | DIY | OLD COMP |
| --- | --- | --- | --- |
| COST | $$$ | $$ | $ |
| DIFFICULTY | Easy | Hard | Medium |
| FUN | 😊 | 🤩 | 😅 |

### NAS software

Pre-made NAS boxes come with their own software.

Build your own or recycle an old PC? You&#39;ll need to install an OS. I went with [Unraid](https://unraid.net/pricing?via=9a88fc) ($49 lifetime) because it seemed the most &quot;i&#39;ve never done this before&quot;-friendly. Worth every penny.

![](/images/nas/unraid_screenshot.png)

### Power consumption

Most NAS units are specifically engineered to use as little power as possible.

Each hard drive (once spun up) might use between 6-12 watts, and the rest of the NAS a bit more.

My hard drives are spinning 24/7, and I estimate roughly $4/month in electric.

An old computer might be a bit higher if it&#39;s running 24/7.

## I want to do this. What are the next steps?

### PRE-MADE&nbsp;👇

Do shopping research! I recommend sticking with Synology, but I&#39;ve also heard of...

- Terramaster
- QNAP
- Ugreen

The **SOFTWARE is what you care about with pre-mades, and Synology and Terramaster are more &quot;proven.&quot;**

### BUILD YOUR OWN&nbsp;👇

1. Read through [one of Brian Moses build breakdowns](https://blog.briancmoses.com/2024/11/diy-nas-2025-edition.html)! These are great for &quot;what do I need to order.&quot; He publishes a new one every year. I followed the &quot;2024 econo-nas&quot; build.
2. Order parts (I used Aliexpress for most of my stuff cuz&#39; it&#39;s cheaper)
3. Head to YouTube for how to put it all together

It took me maybe 8 hours spread out over a few weeks. **If you don&#39;t enjoy this process, don&#39;t go the DIY route.**

You WILL have to Google/YouTube/Claude.ai each little roadblock that comes up!

## Rabbit-holes...

Things you&#39;ll likely learn about in this process...

- How do I &quot;expose&quot; my NAS to the internet, so I can access it when I&#39;m NOT on my wifi network?
- Why tf are hard drives so expensive, and is it worth considering&nbsp;*used&nbsp;*hard drives from Ebay? (yes)
- Pete, do you have a cool way to see current hard drive prices-per-GB on ebay? [YES](https://unli.xyz/diskprices/us/).
- [You didn&#39;t get this from me, and I definitely don&#39;t approve of it.](https://old.reddit.com/r/Piracy/wiki/megathread)

> ## ⚠️ Accept Side Quest?
>
> Get a NAS. A cool device that can replace cloud storage tools, expensive streaming platforms, and WAY more stuff.
>
> *Reward:&nbsp;*🟡 20g

lol I used to play World of Warcraft, and this makes me nostalgic.