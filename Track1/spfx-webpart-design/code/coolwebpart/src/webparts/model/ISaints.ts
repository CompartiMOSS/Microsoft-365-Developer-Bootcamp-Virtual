export interface ISaintProps {
   id: number;
   name: string;
   picture: string;
   bio: string;
   strength: number;
   skills?: string;
   constellation: string;
   class: string;
}

export interface ISaint {
   saint: ISaintProps;
}

export interface ISaints {
   saints: ISaintProps[];
}

export var saintsList: ISaints = 
{"saints": [
   {
       "id": 1, 
       "strength": 18,  
       "name": "Seiya",    
       "class": "Bronze",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/1/1f/Seiya-full.jpg/x256px-Seiya-full.jpg.pagespeed.ic.adsIjSa-7K.webp", 
       "skills": "Seiya, a powerful single damage dealer in the early stage, may become a support character in the later stage by putting enemies in a weakened state with his Pegasus Comet Fist, allowing other Saints to deal even higher damage.",
       "bio": "In order to maintain justice and protect Athena, he is willing to sacrifice everything and won't give up easily. His firm will and unyielding faith is contagious to everyone around him, and he is the spiritual leader of the Five Bronze Saints.",
       "constellation": "Pegasus"
   },
   {
       "id": 2, 
       "strength": 18,
       "name": "Shiryu",     
       "class": "Bronze",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/c/c7/Shiryu-full.jpg/x256px-Shiryu-full.jpg.pagespeed.ic.NICxjjPyrn.webp", 
       "bio": "Shiryu is a student of Libra Dohko and an important partner of Seiya, Shun, Hyoga and Ikki. With an outgoing personality and a strong sense of justice, Shiryu is willing to sacrifice himself to see others happy. Seiya is his brother-in-arms to the bitter end, and he considers him a brother and a best friend. In his left hand, he wields the Sacred Blade given to him by Capricorn Shura. He's known as Seiya's closest friend from the Five Bronze Saints.",
       "skills": "Dragon Shiryu, a high-speed Saint who specializes in Physical Attack, deals more damage to enemies that have not lost much HP. Try to use Shiryu in the beginning rounds of battle. In PvP, Shiryu gains strong protection skills to support core teammates after he has been awakened. Dragon Shiryu is endowed with high speed, which can be leveraged by the Dragon Shield skill for a strong defense, which is why in the late stage he can serve as damage-soaking support with debuff abilities.",
       "constellation": "Dragon"
   }, 
   {
       "id": 3, 
       "strength": 18,  
       "name": "Hyoga", 
       "class": "Bronze",
       "constellation": "Cygnus",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/1/1a/Hyoga-full.jpg/x256px-Hyoga-full.jpg.pagespeed.ic.zwyU9L66YR.webp", 
       "bio": "Cygnus Hyoga, a Saint with the ability to deal cosmic damage. His attacks can be combined with Ice Seal. The more seals attached to the enemy, the higher the chance the enemy will be controlled. When combined with other ice-type Saints, the overall strength of the lineup will be elevated.",
       "skills": "Cygnus Hyoga, a Saint with the ability to deal cosmic damage. His attacks can be combined with Ice Seal. The more seals attached to the enemy, the higher the chance the enemy will be controlled. When combined with other ice-type Saints, the overall strength of the lineup will be elevated."
   },
   {
       "id": 4, 
       "strength": 18,  
       "name": "Shun", 
       "class": "Bronze",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/b/bd/Shun-full.jpg/x256px-Shun-full.jpg.pagespeed.ic.oSMPLKHCPF.webp", 
       "constellation": "Andromeda",
       "bio": "He possesses the Nebula Chain that has both offensive and defensive capabilities. He has always hated fighting, and as a Saint, he hides his enormous Cosmo underneath a soft demeanor. In times of need, he uses his explosive strength to destroy his enemies.",
       "skills": "Andromeda Shun, who has the game's strongest single-target control skill, happens to also have the best skills for physical and cosmic defenses. But due to having a relatively lower speed, it pays to leave energy reserves for Shun in battles. Shun can be regarded as a sturdily built, dual-defense, tank-type support with control skills."
   },
   {
       "id": 5, 
       "strength": 18,  
       "name": "Ikki", 
       "class": "Bronze",
       "constellation": "Phoenix",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/5/57/Ikki-full.jpg/x256px-Ikki-full.jpg.pagespeed.ic.JnxkE8kzj-.webp", 
       "bio": "A man full of hatred. He proclaims himself willing to sacrifice everything. While his personality appears cold and ruthless he is kindhearted, with an irrepressible compassion especially for his brother, Shun. He may never admit that it was his friends who gave him hope, trust, and friendship.",
       "skills": "Ikki has great damage potential through cosmic attacks; each skill cast may increase the damage of the next attack. In addition, Ikki has the ability to rise from ashes like the phoenix; the ability to resurrect during battles makes him a durable fighter."
   },
   {
       "id": 6, 
       "strength": 15,  
       "name": "Marin", 
       "constellation": "Eagle",
       "class": "Bronze",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/e/e6/Marin-full.jpg/x256px-Marin-full.jpg.pagespeed.ic.4XBHxIBvBJ.webp", 
       "bio": "Seiya's mentor, calm and collected with great clairvoyance powers. In order to find the true identity of the Grand Pope, she climbed Star Hill alone to find information on the previous Grand Pope. She is on a quest to find her long lost brother that she swears is still alive. She was once mistaken by Seiya to be Seika",
       "skills": "Eagle Marin is a healing-type Saint capable of healing your entire team in the early stage. The amount she heals is related to her cosmic attack and healing effects. Increase cosmic attack and healing effects to greatly enhance healing, which can be very handy in PvE and PvP matches."
   },
   {
       "id": 7, 
       "strength": 14,  
       "name": "Kiki", 
       "constellation": "",
       "class": "Silver",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/5/5f/Kiki-full.jpg/x256px-Kiki-full.jpg.pagespeed.ic.teOROk5mIk.webp", 
       "bio": "A young, cute practitioner of cosmic power that follows Jamir and Mr. Mu around. He is also a reliable partner of Seiya.",
       "skills": "The most versatile Saint in the game, Kiki is often a must-have in any lineup. He provides enough energy points in the first round to enable allies to cast their skills to defeat enemies more effectively in both PvE and PvP matches. Awakening him will increase energy points further, so it's recommended to awaken Kiki before focusing on other Saints."
   },
   {
       "id": 8, 
       "strength": 16,  
       "name": "Shaina", 
       "constellation": "Ophiuchus",
       "class": "Silver",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/9/98/Shaina-full.jpg/x256px-Shaina-full.jpg.pagespeed.ic.2UBs7DUfXs.webp", 
       "bio": "After Seiya knocked off her mask, her angelic beauty was revealed. As a female Saint, if a male sees her face, she must either kill him or fall in love with him. Shaina fell in love with Seiya, and often puts herself in danger for his sake.",
       "skills": "Shaina is a support Saint who increases the speed for her entire team. She can speed up her team to have them take actions before enemies do, which can play a very important role in PvP combat. Shaina is very adaptable and can be used in a variety of lineups."
   },
   {
       "id": 9, 
       "strength": 18,  
       "name": "Misty", 
       "constellation": "Lizard",
       "class": "Silver",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/0/01/Misty-full.jpg/x256px-Misty-full.jpg.pagespeed.ic.zfcSnSFbXw.webp", 
       "bio": "The narcissistic Misty is most proud of the fact that he hasn't been injured in over a hundred battles. He is overly obsessed with his beauty, and hates being spattered with blood in battle. He is so exceptionally gifted that he once caused an eruption at Mt. Fuji with just a flick of his finger.",
       "skills": "Lizard Misty is a damage-reflecting defense-type Saint with the ability to taunt enemies and forcing them to attack Misty with basic attacks, making enemy damage dealers lose efficiency. Strong against offense-oriented lineups when combined with Chameleon June and Marin's link formation."
   },
   {
       "id": 10, 
       "strength": 15,  
       "name": "Ptolemy", 
       "constellation": "Sagitta",
       "class": "Silver",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/2/2b/Ptolemy-full.jpg/x256px-Ptolemy-full.jpg.pagespeed.ic.wVv5JqDA66.webp", 
       "bio": "Capable of using countless shadow arrows to distract the enemy while landing the killing blow with a single Golden Arrow. He was ordered by the Grand Pope to kill Saori Kido. It was then that the legend of the Bronze Saints entering the Twelve Temples of the Sanctuary to remove the Golden Arrow was born.",
       "skills": "Sagitta Ptolemy is a single-target damage dealer who deals delayed damage. Despite being a B-card and not very effective at completing dungeons, his unique way of dealing damage may work surprisingly well in the arena."
   },
   {
       "id": 11, 
       "strength": 14,  
       "name": "Algol", 
       "constellation": "Perseus",
       "class": "Silver",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/8/83/Algol-full.jpg/x256px-Algol-full.jpg.pagespeed.ic.vxSBIxy8tf.webp", 
       "bio": "Wielding the Shield of Medusa, anyone who sees it is turned to stone: a fate inescapable even if your eyes are closed.",
       "skills": "Perseus Algol is a defensive counter-attack Saint with mixed AoE and control abilities. The passive skill that petrifies an enemy attacker after Perseus Algol takes a certain amount of damage earns him a special place tactically in both PvP and PvE matches."
   },
   {
       "id": 13, 
       "strength": 13,  
       "name": "Babel", 
       "constellation": "Centaurus",
       "class": "Silver",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/a/a7/Babel-full.jpg/x256px-Babel-full.jpg.pagespeed.ic.pObSAToqud.webp", 
       "bio": "Commands the fiercest fires of the Silver Saints. It's claimed that he can scorch the earth barren with his fists alone. He was sent by the Grand Pope to participate in the Galaxian Wars and eliminate all the Bronze Saints.",
       "skills": "Centaurus Babel is a support/damage dealer Saint that can stack Burn marks on enemies as well as use these marks to deal damage when casting skills. Can work in conjunction with other fire-type Saints to inflict serious damage."
   },
   {
       "id": 13, 
       "strength": 18,  
       "name": "Mu", 
       "constellation": "Aries",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/b/bd/Mu-full.jpg/x256px-Mu-full.jpg.pagespeed.ic.pccmddAmoi.webp", 
       "bio": "",
       "skills": "Aries - Mu excels at protecting teammates by providing them with shields. The damage they absorb can be reflected back at the enemy by casting skills, making him a formidable defensive counterattack Saint."
   },
   {
       "id": 14, 
       "strength": 19,  
       "name": "Aldebaran", 
       "constellation": "Taurus",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/1/17/Aldebaran-full.jpg/x256px-Aldebaran-full.jpg.pagespeed.ic.TJ_96QL-0b.webp", 
       "bio": "\"The bravest of the Zodiac\", also known as the Golden Bull, is forthright and righteous. His personality is both outgoing and upright. He believes in his own judgment and is extremely loyal to his friends and Athena. His frame is enormous, and can match up to any Gold Saint in battle.",
       "skills": "Taurus is a burst-type single damage dealer, reaching his true damage potential by charging up his attacks"
   },
   {
       "id": 15, 
       "strength": 19,  
       "name": "Saga", 
       "constellation": "Gemini",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/a/a4/Saga-full.jpg/x256px-Saga-full.jpg.pagespeed.ic.VPdzOJy7Nw.webp", 
       "bio": "Saga is a powerful damage dealer but costs more. Make sure that cost is reserved for him, and his high-damaging AOE [Galaxy Explosion]. Use it at the beginning of a map when facing multiple enemies for the best effect.",
       "skills": "Saga is a S-level burst damage dealer highly effective at clearing PvE content. He also packs a mean punch for PvP scenarios."
   },    
   {
       "id": 16, 
       "strength": 18,  
       "name": "Deathmask", 
       "constellation": "Cancer",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/e/e0/Deathmask-full.jpg/x256px-Deathmask-full.jpg.pagespeed.ic.ZYnfrkaX4d.webp", 
       "bio": "He is extremely bloodthirsty. When it comes to what he sees as purifying evil, he has no sense of pity and is even willing to hurt the innocent. He possesses a unique skill that allows him to shift between Yomotsu Hirasaka and the current world.",
       "skills": "Cancer, as a backup Saint, has high burst damage in the later stages of battle, making it possible to turn the tide."
   },    
   {
       "id": 17, 
       "strength": 19,  
       "name": "Aioria", 
       "constellation": "Leo",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/f/f9/Aiolia-full.jpg/x256px-Aiolia-full.jpg.pagespeed.ic.8nJtO5QE_5.webp", 
       "bio": "Bearing the stigma of having a traitor to the Sanctuary as an elder brother, he nonetheless remains true to his beliefs through the adversity he faces. He is one of the most righteous Gold Saints, the embodiment of zeal and courage and a role model for all Saints.",
       "skills": "Leo is a powerful AoE Saint capable of dealing massive damage when coupled with control Saints.."
   },    
   {
       "id": 18, 
       "strength": 20,  
       "name": "Shaka", 
       "constellation": "Virgo",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/2/2c/Shaka-full.jpg/x256px-Shaka-full.jpg.pagespeed.ic.GDWdqJeIuJ.webp", 
       "bio": "",
       "skills": "Virgo Shaka is one of the few control Saints capable of attacking multiple targets at once. His skill has the chance to silence the main target, while growing stronger as the battle goes on!"
   },    
   {
       "id": 19, 
       "strength":20,  
       "name": "Dohko", 
       "constellation": "Libra",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/3/39/Dohko-full.jpg/x256px-Dohko-full.jpg.pagespeed.ic.eIsRiN8nBe.webp", 
       "bio": "",
       "skills": "Dohko is capable of dealing very high damage. His damage is doubled when he reaches 4 Tiger Souls, which makes it important to stack them during battle."
   },    
   {
       "id": 20, 
       "strength":18,  
       "name": "Milo", 
       "constellation": "Scorpio",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/0/06/Milo-full.jpg/x256px-Milo-full.jpg.pagespeed.ic._tvsZXQunD.webp", 
       "bio": "Forthright and sincere with a great sense of justice, Milo is also a good friend of Aquarius Camus and very proud to be a Gold Saint. His sure-shot skill \"Scarlet Needle\" delivers the lethal strike only on the 15th move, which is why it's known as the \"kindest skill.\"",
       "skills": "Scorpio Milo is a no-cost damage-type Saint whose skills can lower the enemy's defenses, and deal high burst damage to the one target on the third attack. Scorpio may go hand-in-hand with Sextans to launch multiple attacks in a single round."
   },    
   {
       "id": 21, 
       "strength": 20,  
       "name": "Aioros", 
       "constellation": "Sagittarius",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/4/44/Aiolos-full.jpg/x256px-Aiolos-full.jpg.pagespeed.ic.xL-8U6_qSX.webp", 
       "bio": "Thirteen years ago, Aiolos was named a candidate to become the next Grand Pope. However, he put his life on the line in order to protect the Goddess incarnate Saori Kido. In doing so, he was branded a traitor of the Sanctuary. Though his body has been destroyed, he lives on in spirit and encourages the other Saints to fight for justice.",
       "skills": "Aiolos is very capable of killing an enemy in one strike, but his Golden Arrows needs to absorb teammates' PATK. He requires around 3 PATK supports in the lineup for best effect."
   },    
   {
       "id": 22, 
       "strength":18,  
       "name": "Shura", 
       "constellation": "Capricorn",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/1/1c/Shura-full.jpg/x256px-Shura-full.jpg.pagespeed.ic.0wZKa4tWpw.webp", 
       "bio": "The name Shura is derived from Asua, a God of war from the Buddhist pantheon, the Capricorn Gold Saint that was trained in Pyrenees Mountains and a guardian of the tenth zodiac temple. His powerful sword the Sacred Blade can cut anything. He was dubbed as one of the most powerful Gold Saints among them all.",
       "skills": "Capricorn Shura's Sacred Blade increases in power with each enemy he kills, making him stronger with each defeated enemy"
   },    
   {
       "id": 23, 
       "strength":17,  
       "name": "Camus", 
       "constellation": "Aquarius",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/4/42/Camus-full.jpg/x256px-Camus-full.jpg.pagespeed.ic.xXrs3_ToNz.webp", 
       "bio": "",
       "skills": "Aquarius Camus is a very powerful control Saint, and he can inflict immense damage on enemies who have been marked with several seals. Couple him with Hyoga to quickly stack seals upon the enemy, which in turn increases their chance to Freeze. Make certain to explode the seals at the opportune moment."
   },    
   {
       "id": 24, 
       "strength": 19,  
       "name": "Aphrodite", 
       "constellation": "Pisces",
       "class": "Gold",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/4/42/Camus-full.jpg/x256px-Camus-full.jpg.pagespeed.ic.xXrs3_ToNz.webp", 
       "bio": "Aphrodite, the Pisces Gold Saint, is known as the most beautiful of the eighty-eight Saints. The stars all lose their color when compared to him.",
       "skills": "Pisces Aphrodite mainly relies on her passive skills and spending surplus energy to summon roses with combo attacks."
   },    
   {
       "id": 25, 
       "strength": 15,  
       "name": "Athena", 
       "constellation": "",
       "class": "Legendary",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/7/73/Kido-full.jpg/x256px-Kido-full.jpg.pagespeed.ic.ZqLDykqMyQ.webp",
       "bio": "Every time evil invades the world, Goddess Athena and the Saints work together to protect it as they battle for love and justice. Entrusted to Mitsumasa Kido by Aiolos, Saori Kido is the reincarnation of Athena and sole heir to the Graude Foundation.",
       "skills": "Saori Kido is a purification/protector type Saint who is immune to any control effects. On the battlefield, she can purify other Saints afflicted by control effects. She also possesses strong protection abilities, capable of aiding ally Saints in HP recovery and escaping death. Speed and HP are Saori Kido's core attributes."
   },   
   {
       "id": 26, 
       "strength": 21,  
       "name": "Hades", 
       "constellation": "",
       "class": "Legendary",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/8/86/Hades-full.jpg/x256px-Hades-full.jpg.pagespeed.ic.2mNiMADBLK.webp",
       "bio": "As one of the main Gods, he is strong enough to not only hold his own against five Divine Cloth Saints, but also overpower them. He was victorious in his battle against Athena. His renown among the Greek gods matches that of Zeus and Poseidon.",
       "skills": ""
   },   
   {
       "id": 27, 
       "strength": 21,  
       "name": "Poseidon", 
       "constellation": "",
       "class": "Legendary",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/2/27/Poseidon-full.jpg/x256px-Poseidon-full.jpg.pagespeed.ic.gMI6OwvIYw.webp",
       "bio": "Poseidon possesses three powers: Sea Tide, Ice Crystal and Thunder Cloud. By combining his powers to a varying degree, he can unleash the skill \"Ocean's Determination\", whose effect differs depending on the combination. Upon using this skill, Poseidon absorbs the power required by the skill and gains increased attributes. Each Power can stack up to 3. The order in which the powers are accumulated does not change the effect).",
       "skills": "Poseidon is a very powerful all-round Cosmic attack Saint. He can summon spirits of the seas to assist him in battle, he is capable of counterattacking and can reduce the enemy’s SPD permanently. Both his single-target and AoE attacks are very powerful, and he is also capable of freezing the enemy. If that’s not all, all of his powers permanently increases his stats."
   },   
   {
       "id": 28, 
       "strength": 19,  
       "name": "Shion", 
       "constellation": "Aries",
       "class": "Legendary",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/2/2e/Shion-full.jpg/x256px-Shion-full.jpg.pagespeed.ic.I7L5tjpTnM.webp",
       "bio": "",
       "skills": "Shion excels at providing protection ability, as well as dealing damage. He is a versatile support/damage dealer."
   },   
   {
       "id": 29, 
       "strength": 17,  
       "name": "Grand Pope", 
       "constellation": "Gemini",
       "class": "Legendary",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/a/ad/Grandpope-full.jpg/x256px-Grandpope-full.jpg.pagespeed.ic.leVhuQxzvW.webp",
       "bio": "He is the supreme leader of the Sanctuary that uses Athena's will to control it. Widely loved and recognized to be the incarnation of God himself, he is considered highly mysterious and sometimes speaks to himself. Nobody has seen his real face under his mask, or at least, nobody has lived to tell the tale...",
       "skills": "The Grand Pope has very potent control skills. After casting \"Another Dimension\", enemies have a high chance of being affected by it, rendering them unable to use basic attacks or skills. The presence of \"Another Dimension\" gives teammates an upper hand in battles."
   },   
   {
       "id": 30, 
       "strength": 19,  
       "name": "Shaka", 
       "constellation": "Arayashiki",
       "class": "Legendary",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/7/7c/Arayashiki-shaka-full.jpg/x256px-Arayashiki-shaka-full.jpg.pagespeed.ic.Pfys1Fu_8C.webp",
       "bio": "Arayashiki Shaka is the 8th Sense of the Gold Saints Virgo Shaka.",
       "skills": "As a highly integrated output, Alaya-Sharjah not only has extraordinary output capabilities, but also has the ability to purify and counterattack."
   }
]};
