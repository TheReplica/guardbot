const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {
  
  const yetkiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin`, message.author.avatarURL)
  
    if (!message.member.roles.find("name", "BU KOMUTU KULLANACAK YETKILI ROL ADI")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`BU KOMUTU KULLANACAK YETKILI ROL ADI*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    } 
  
  const kisiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Kişiyi Etiketlemelisin`, message.author.avatarURL)
  
  var kisi = message.mentions.users.first()
  
  if (!kisi)
    return message.channel.send(kisiyok)
  
  const yok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bu Kullanıcının Hiç Uyarısı Yok`, kisi.avatarURL)
  
  let uyarisi = await db.get(`uyarı.${kisi.id+message.guild.id}`)
  if (!uyarisi || uyarisi == 0) return message.channel.send(yok)
        let uyarisayiyolla = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`**${kisi.username} Adlı Kullanıcının Toplam Uyarısı : **` + db.get(`uyarı.${kisi.id+message.guild.id}`) || '0', true)
       

message.channel.send(uyarisayiyolla)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uyarılar", "infractions", "uyarı-bak"],
  perm: 0
}

exports.help = {
  name: "Uyarılar",
  description: "Kişinin Varsa Uyarılarını Gösterir",
  usage: "/uyarılar @Kişi"
}
