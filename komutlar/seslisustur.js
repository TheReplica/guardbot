const Discord = require('discord.js');
const ms = require("ms");

module.exports.run = (client, message, args) => {
  
    if (!message.member.roles.find("name", "BU KOMUTU KULLANACAK YETKILI ROL ADI")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`BU KOMUTU KULLANACAK YETKILI ROL ADI*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }
let kullanici = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!kullanici) return message.channel.send("Lütfen susturulacak kişiyi belirtiniz.")
  if(kullanici.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Benden yetkili birini susturamam.");
  if (kullanici.id === message.author.id) return message.channel.send("Kendinizi susturamazsınız.");
  
    let süre = args[1]
  if(!süre) return message.channel.send("Lütfen doğru bir zaman dilimi giriniz. Örneğin: ***!voicemute @kişi 1s/m/h/d sebep**");
  let sebep = args[2]
  if (!sebep) return message.channel.send("Lütfen bir sebep giriniz. Örneğin: ***!voicemute @kişi 1s/m/h/d sebep**");
     let embed =  new Discord.RichEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
              .setDescription(` ${süre} süreliğine  tarafından ${sebep} sebebiyle susturuldu!`)
              .setColor("RANDOM");
  kullanici.setMute(true, `Susturan yetkili: ${message.author.tag} - Susturma süresi: ${süre} ms`)
        .then(() => message.channel.send(embed)).catch(console.error);
        setTimeout(() => {
 kullanici.setMute(false,`Süresi dolduğu için susturması kaldırıldı.`)
          let sembed =  new Discord.RichEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setDescription(` üyesinin, ${süre} sürelik susturulması, otomatik olarak kaldırıldı.`)
                .setColor("RANDOM");
        message.channel.send(sembed)

    }, ms(süre))
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sescezası", "sesli-sustur"],
    permLevel: 0
};

exports.help = {
    name: 'seslisustur',
    description: 'seslide sustur',
    usage: "seslisustur"
};
