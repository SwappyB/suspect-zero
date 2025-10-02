import { Mystery } from './types';

export const blackwoodMystery: Mystery = {
  title: "The Blackwood Estate Murder",
  setting: "The isolated Blackwood Estate during a thunderstorm on October 15th, 2024",
  victim: {
    name: "Victor Blackwood",
    age: 62,
    occupation: "Art Collector and Gallery Owner",
    background: "Wealthy collector known for his ruthless business tactics and extensive collection of rare paintings. Recently made headlines for acquiring a controversial Renaissance piece."
  },
  synopsis: "Victor Blackwood was found dead in his private gallery at 11:47 PM during his exclusive dinner party. Five guests remain trapped in the estate due to the storm. One of them is a killer.",
  timeOfDeath: "Between 10:30 PM and 11:15 PM",
  causeOfDeath: "Poisoning - Cyanide found in champagne glass",

  suspects: [
    {
      id: "suspect_1",
      name: "Margaret Chen",
      age: 45,
      occupation: "Business Partner",
      relationship: "Co-owner of Blackwood Gallery",
      description: "Sharp-minded businesswoman with a keen eye for profit. Has been Victor's partner for 15 years.",
      motive: "Victor was planning to buy her out of the gallery at a fraction of what her shares were worth. She discovered this two weeks ago.",
      alibi: "Claims she was in the library making business calls between 10:15 PM and 11:30 PM",
      imageUrl: "/images/margaret.jpg",
      interview: [
        {
          question: "Where were you between 10:30 and 11:15 PM?",
          answer: "I was in the library on a conference call with our Tokyo investors. The call logs will confirm this. Victor and I had our differences, but I'd never... this is absurd."
        },
        {
          question: "How would you describe your relationship with Victor?",
          answer: "Complicated. We built something incredible together, but lately... he'd been making decisions without consulting me. Still, he was my partner."
        },
        {
          question: "Did you know about the buyout plan?",
          answer: "What buyout? I... I have no idea what you're talking about."
        },
        {
          question: "Do you know who might have wanted Victor dead?",
          answer: "Victor made enemies easily. That Castellano woman has been threatening legal action for months. And his daughter... well, their relationship was toxic."
        }
      ],
      secrets: [
        "Was secretly embezzling from the gallery to cover gambling debts",
        "The Tokyo call never happened - phone records will show no outgoing calls during that time"
      ]
    },
    {
      id: "suspect_2",
      name: "Sophia Blackwood",
      age: 28,
      occupation: "Artist and Heiress",
      relationship: "Estranged Daughter",
      description: "Victor's only child. Talented artist who rejected the family business. Recently reconciled with her father after 5 years of no contact.",
      motive: "Victor had written her out of his will completely after their estrangement. She only discovered this last month when her mother passed away.",
      alibi: "Says she was in the conservatory painting and didn't notice the time",
      imageUrl: "/images/sophia.jpg",
      interview: [
        {
          question: "When did you last speak with your father?",
          answer: "At dinner, around 9:45. We actually had a pleasant conversation for once. He seemed... different. Almost remorseful. Now I'll never know what he wanted to tell me."
        },
        {
          question: "Where were you at the time of death?",
          answer: "The conservatory. I paint when I'm anxious, and being back in this house... I lose track of time when I work."
        },
        {
          question: "Were you aware you'd been removed from the will?",
          answer: "Yes. My mother told me before she died. But tonight, Father said he'd been reconsidering. He asked me to meet him in the gallery at 10:45. I went, but... he wasn't there."
        },
        {
          question: "Did anyone see you in the conservatory?",
          answer: "Edmund brought me tea around 10:00. After that, no one. The conservatory is in the east wing, away from everything."
        }
      ],
      secrets: [
        "She did go to the gallery at 10:45 as planned",
        "Had been prescribed anxiety medication that included cyanide compounds for art restoration work"
      ]
    },
    {
      id: "suspect_3",
      name: "Edmund Price",
      age: 67,
      occupation: "Butler",
      relationship: "Loyal Servant for 30 years",
      description: "The quintessential English butler. Has served the Blackwood family since Victor's father was alive. Knows every secret of the estate.",
      motive: "Victor discovered Edmund had been stealing valuable wine from the cellar and was going to press charges. Edmund would lose his pension and face jail time.",
      alibi: "Was serving drinks and clearing dishes. Multiple guests saw him throughout the evening.",
      imageUrl: "/images/edmund.jpg",
      interview: [
        {
          question: "Walk us through your evening, Edmund.",
          answer: "I served cocktails at 8:30, dinner at 9:00, and continued attending to guests until I discovered Mr. Blackwood at 11:47. I was performing my duties as always."
        },
        {
          question: "Did you notice anything unusual tonight?",
          answer: "Mr. Blackwood seemed... agitated. He had words with Ms. Castellano before dinner. And he asked me to prepare his private gallery, said he was expecting someone."
        },
        {
          question: "You've been with the family for decades. Did Victor have enemies?",
          answer: "Mr. Blackwood was a difficult man. Brilliant, but difficult. Many people had reasons to resent him. But to kill him? I cannot imagine who would go that far."
        },
        {
          question: "Where were you specifically between 10:30 and 11:15?",
          answer: "I was in and out of the kitchen, the dining room, and the hallways. I brought Miss Sophia her tea at 10:00, served brandy to Mr. Thornton at 10:20, and was polishing silver in the pantry around 10:45."
        }
      ],
      secrets: [
        "Had been stealing wine for years, worth over $200,000",
        "Has a key to every room in the estate, including the poison storage in the old photography darkroom"
      ]
    },
    {
      id: "suspect_4",
      name: "Isabella Castellano",
      age: 52,
      occupation: "Art Historian and Rival Collector",
      relationship: "Professional Rival",
      description: "Renowned art historian who has been in bitter competition with Victor for decades. Recently lost a major acquisition to him.",
      motive: "Victor acquired the 'Madonna of Valencia' through questionable means, a painting Isabella had been researching for 10 years. The acquisition ruined her reputation and cost her her position at the museum.",
      alibi: "Claims she was in the smoking room with documents, preparing a lawsuit against Victor",
      imageUrl: "/images/isabella.jpg",
      interview: [
        {
          question: "Why did you accept Victor's invitation tonight?",
          answer: "To serve him papers. I was suing him for fraud and theft of intellectual property. He stole the Madonna from under me using my own research."
        },
        {
          question: "You had a confrontation with Victor before dinner?",
          answer: "Yes. I told him I would see him ruined. I wanted him to lose everything like I did. But I wanted him alive to suffer through it. Dead, he becomes a martyr."
        },
        {
          question: "Where were you at 10:45 PM?",
          answer: "The smoking room, going over my case files. I was alone, but my documents are time-stamped. I was working on my laptop."
        },
        {
          question: "Did you bring anything with you tonight?",
          answer: "Legal documents, my laptop, and... a bottle of wine as a bitter gift. It was from the year he stole my first discovery from me. Petty, I know."
        }
      ],
      secrets: [
        "The wine she brought was also poisoned, but with a slow-acting agent, not cyanide",
        "She has a degree in chemistry from her early academic career"
      ]
    },
    {
      id: "suspect_5",
      name: "James Thornton",
      age: 38,
      occupation: "Private Art Dealer",
      relationship: "Secret Business Associate and Blackmailer",
      description: "Charming dealer who specializes in acquiring rare pieces through unconventional means. Has been working with Victor on secret deals.",
      motive: "Victor refused to pay Thornton his commission on the Madonna deal - $500,000. Thornton had been blackmailing Victor about the painting's stolen provenance. Victor threatened to expose Thornton's own illegal dealings.",
      alibi: "Says he was on the terrace smoking cigars and enjoying the storm between 10:15 and 11:00 PM",
      imageUrl: "/images/james.jpg",
      interview: [
        {
          question: "How did you know Victor Blackwood?",
          answer: "We did business together. I connected him with sellers, helped facilitate transactions. Perfectly legitimate work."
        },
        {
          question: "Were you on the terrace during the relevant time?",
          answer: "Yes, from about 10:15 to 11:00. I enjoy storms, and Victor's cigars. Edmund can confirm he brought me brandy at 10:20."
        },
        {
          question: "Did Victor owe you money?",
          answer: "We had ongoing business arrangements. Nothing unusual. Victor always paid his debts eventually."
        },
        {
          question: "What can you tell us about the Madonna of Valencia?",
          answer: "Beautiful piece. Victor was thrilled with it. Why do you ask?"
        }
      ],
      secrets: [
        "The Madonna was stolen from a private collection in Spain - he and Victor orchestrated the theft",
        "He wasn't on the terrace the entire time - security footage is mysteriously corrupted for 15 minutes",
        "He has cyanide in his car - uses it for cleaning antique frames"
      ]
    }
  ],

  evidence: [
    {
      id: "evidence_1",
      title: "Victim's Champagne Glass",
      category: "forensic",
      description: "Crystal champagne flute found near Victor's body",
      content: "Forensic analysis reveals traces of potassium cyanide mixed with Dom Pérignon 2008. Fingerprints found: Victor Blackwood (victim) and one partial print that is smudged beyond recognition. The champagne was from a bottle opened at 10:30 PM according to the butler's timeline.",
      linkedTo: ["suspect_3", "evidence_7"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_2",
      title: "Victor's Modified Will",
      category: "document",
      description: "Recently updated last will and testament, dated October 1st, 2024",
      content: "The will shows significant changes: Sophia Blackwood previously removed entirely, but a handwritten note dated October 14th (day before the murder) states 'Must revise - reinstate Sophia as primary beneficiary. See lawyer tomorrow.' Margaret Chen's share reduced from 40% to 15%. Edmund Price's pension cancelled. Current beneficiaries before the planned change: Margaret Chen (40%), Museum of Modern Art (30%), Various charities (30%).",
      linkedTo: ["suspect_1", "suspect_2", "suspect_3"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_3",
      title: "Security Camera Log",
      category: "digital",
      description: "Digital access log from estate security system",
      content: "Gallery entrance logs:\n- 9:15 PM: Victor Blackwood (entered)\n- 9:47 PM: Victor Blackwood (exited)\n- 10:35 PM: Victor Blackwood (entered)\n- 10:42 PM: Sophia Blackwood (entered)\n- 10:46 PM: Sophia Blackwood (exited)\n- 10:51 PM: [CORRUPTED DATA]\n- 11:47 PM: Edmund Price (entered, discovered body)\n\nNote: Cameras in gallery corridor mysteriously malfunctioned between 10:51 PM and 11:35 PM. Technical analysis suggests manual interference with power supply.",
      linkedTo: ["suspect_2", "suspect_5", "evidence_13"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_4",
      title: "Margaret's Phone Records",
      category: "digital",
      description: "Cell phone data from Margaret Chen's device",
      content: "Call log shows:\n- 9:45 PM: Outgoing call to 'Law Office - Hendricks' (3 minutes)\n- 10:15 PM: Attempted call to Tokyo number (failed, no connection)\n- 10:47 PM: Text message sent to unknown number: 'It's done. We need to talk.'\n- 11:20 PM: Multiple deleted text messages (recovered by forensics)\n\nRecovered texts: 'Can't go through with this,' 'He deserves it but I can't,' 'Someone else will do it'\n\nGPS data shows phone was in the library as claimed, but inactive period between 10:30-11:00 PM suggests phone was left there while owner was elsewhere.",
      linkedTo: ["suspect_1", "evidence_11"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_5",
      title: "Sophia's Art Supplies",
      category: "physical",
      description: "Paint palette and supplies from the conservatory",
      content: "Canvas shows painting was indeed in progress during the timeframe claimed. However, paint is dry in some areas, suggesting work stopped around 10:40 PM, not 11:30 as Sophia claimed. Among supplies: bottles of various solvents including one labeled 'Potassium Ferricyanide - for art restoration.' Chemical analysis shows this bottle could be converted to potassium cyanide with basic chemistry knowledge. Bottle is nearly full, appears unused for its intended purpose.",
      linkedTo: ["suspect_2", "evidence_1"],
      importance: "medium",
      redHerring: false
    },
    {
      id: "evidence_6",
      title: "Edmund's Pantry Journal",
      category: "personal",
      description: "Butler's personal log of daily duties",
      content: "Recent entries:\nOctober 10: 'Mr. B. inspected the cellar. My heart nearly stopped. Must be more careful.'\nOctober 12: 'He knows. Called me to his study. Threatened prosecution. 30 years of service means nothing.'\nOctober 14: 'Have decided what I must do. Cannot face prison at my age. The old darkroom has what I need.'\nOctober 15: 'Tonight is the night. God forgive me. But perhaps... no, I must be strong.'\n\nLast entry has a line drawn through it, as if Edmund changed his mind.",
      linkedTo: ["suspect_3", "evidence_14"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_7",
      title: "Champagne Bottle",
      category: "physical",
      description: "Dom Pérignon 2008 bottle found in gallery",
      content: "The bottle found in the gallery appears untainted - no poison in the remaining champagne. However, forensics found traces of cyanide on the rim of the bottle's mouth, suggesting poison was added after pouring. Fingerprints: Edmund Price (clear), Victor Blackwood (partial). Bottle was stored in the main wine cellar, not Victor's private collection. Butler's notes indicate this bottle was specifically requested by Victor for the gallery at 10:25 PM.",
      linkedTo: ["suspect_3", "evidence_1"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_8",
      title: "Isabella's Lawsuit Documents",
      category: "document",
      description: "Legal papers and research files",
      content: "Comprehensive lawsuit detailing Victor's acquisition of the Madonna of Valencia. Includes evidence of forged provenance documents and suspicion of theft. Isabella's research is meticulous, spanning 10 years. Most damning: she has proof Victor knew the painting was stolen. Her reputation was destroyed when the museum fired her for 'conspiracy theories.' Timestamp on laptop shows files were indeed being edited between 10:30-11:15 PM. But WiFi logs show a 12-minute disconnection starting at 10:46 PM.",
      linkedTo: ["suspect_4", "suspect_5", "evidence_12"],
      importance: "medium",
      redHerring: false
    },
    {
      id: "evidence_9",
      title: "Wine Bottle from Isabella",
      category: "physical",
      description: "1987 Bordeaux brought by Isabella as a 'gift'",
      content: "Toxicology shows the wine contains aconite, a slow-acting poison that causes heart failure over 24-48 hours. Not the cause of Victor's death. Isabella's fingerprints are on the bottle. Wine was placed on Victor's desk in the study but never opened. Aconite is traceable to a specific rare flower that grows wild in Isabella's country estate. The dose would have been lethal but took time to work - this was meant for a slower, less suspicious death.",
      linkedTo: ["suspect_4"],
      importance: "medium",
      redHerring: true
    },
    {
      id: "evidence_10",
      title: "James Thornton's Contract",
      category: "document",
      description: "Business agreement between Thornton and Victor",
      content: "Contract for 'acquisition services' regarding the Madonna of Valencia. Commission: $500,000 payable upon successful delivery. Addendum dated September 30th in Victor's handwriting: 'Commission reduced to $100,000 due to complications and exposure of methods. Non-negotiable. Acceptance of payment constitutes agreement.' Thornton never signed the addendum. Margin notes in Thornton's writing: 'Bastard,' 'Will regret this,' and a phone number traced to a known forger in Barcelona.",
      linkedTo: ["suspect_5", "evidence_12"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_11",
      title: "Unknown Number Text Messages",
      category: "digital",
      description: "Texts from the mysterious number that Margaret contacted",
      content: "Phone records trace the 'unknown number' to a burner phone purchased at a convenience store in the nearby town. The phone was used only to communicate with Margaret. Messages from earlier in the week:\n'Oct 12: Are you certain you want to go through with this?'\n'Oct 13: I'll handle everything. Just make sure you're somewhere visible.'\n'Oct 14: Tomorrow night. Don't lose your nerve.'\n'Oct 15, 10:47 PM: [Responding to Margaret's 'It's done'] You didn't do anything. I told you I would handle it. Stay quiet.'\n\nPhone's location history shows it was at the estate tonight.",
      linkedTo: ["suspect_1", "evidence_4"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_12",
      title: "The Madonna of Valencia Provenance",
      category: "document",
      description: "Forged documentation for stolen painting",
      content: "The painting's papers trail back to a Spanish private collection reported stolen in March 2024. James Thornton facilitated the theft through contacts, then created false provenance with the Barcelona forger. Victor knew the painting was stolen but paid for it anyway - his obsession with owning it clouded his judgment. Isabella's research uncovered the theft, but she was discredited before anyone believed her. The painting is currently valued at $15 million.",
      linkedTo: ["suspect_4", "suspect_5", "evidence_8"],
      importance: "medium",
      redHerring: false
    },
    {
      id: "evidence_13",
      title: "Security System Technical Report",
      category: "forensic",
      description: "Analysis of camera system malfunction",
      content: "The security system corruption was caused by a deliberate power interruption. The circuit breaker for the gallery cameras was switched off manually at 10:49 PM and restored at 11:35 PM. The breaker box is located in the basement utility room, accessible to anyone who knows the estate layout. Edmund's blueprints of the estate show the utility room location. Fingerprints on the breaker switch are too smudged to identify, but fiber analysis found threads matching Edmund's butler uniform.",
      linkedTo: ["suspect_3", "suspect_5", "evidence_3"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_14",
      title: "Darkroom Poison Storage",
      category: "physical",
      description: "Old photography darkroom with chemical cabinet",
      content: "Victor's late wife was an avid photographer. The darkroom hasn't been used in years but still contains developing chemicals, including a bottle of potassium cyanide (used in photographic processes). The bottle shows recent disturbance - dust pattern indicates it was moved within the last 24 hours. Cabinet was unlocked. Edmund has keys to all rooms. The bottle is 40% empty, but old inventory logs show it should be 85% full. Someone took approximately 50 grams - enough for a lethal dose with plenty left over.",
      linkedTo: ["suspect_3", "evidence_6"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_15",
      title: "Sophia's Medication Prescription",
      category: "document",
      description: "Psychiatric prescription and art restoration supplies order",
      content: "Prescription for anxiety medication (Xanax) dated October 1st. Separate order form for art restoration chemicals including 'Potassium Ferricyanide 100g' dated September 28th. Delivery confirmation shows chemicals were delivered to Sophia's studio address on October 2nd. Medical records show Sophia has been treating severe anxiety following her mother's death. The art restoration chemical is legitimate for her work, but a chemistry student could theoretically convert it to cyanide, though it would require specific knowledge and additional chemicals.",
      linkedTo: ["suspect_2", "evidence_5"],
      importance: "medium",
      redHerring: true
    },
    {
      id: "evidence_16",
      title: "Thornton's Car Trunk Inventory",
      category: "physical",
      description: "Items found in James Thornton's vehicle",
      content: "Police search revealed: frame cleaning supplies, including a container of cyanide solution for removing old gilding (legitimate use in art restoration), gloves, a burner phone (different from the one texting Margaret), and $50,000 in cash. Also found: printed emails between Thornton and Victor showing increasingly hostile exchanges about the commission. Last email from Thornton dated October 14th: 'You'll pay one way or another.' Victor's response: 'Are you threatening me? I'll expose everything, including Barcelona. Try me.'",
      linkedTo: ["suspect_5", "evidence_10"],
      importance: "medium",
      redHerring: true
    },
    {
      id: "evidence_17",
      title: "Estate Floor Plan with Annotations",
      category: "document",
      description: "Architectural drawings with handwritten notes",
      content: "Original blueprints from 1920s with Edmund's annotations over the years. Shows secret passages (now sealed), hidden servants' corridors, location of all utility rooms, and private areas. Notes in Edmund's hand indicate thorough knowledge of every inch of the estate. Markings show: wine cellar entry points, security camera blind spots, and a note near the gallery: 'Master's sanctuary - prepare at 10:25 PM per his request for private meeting.' Another note: 'Breaker box basement - cameras Gallery Wing Circuits 7-9.'",
      linkedTo: ["suspect_3", "evidence_13"],
      importance: "medium",
      redHerring: false
    },
    {
      id: "evidence_18",
      title: "Dinner Party Timeline",
      category: "document",
      description: "Compiled timeline of guest movements",
      content: "Based on witness statements and evidence:\n8:30 PM - Cocktails served (all guests present)\n9:00 PM - Dinner begins\n9:45 PM - Dinner ends, guests disperse\n10:00 PM - Edmund brings Sophia tea in conservatory\n10:15 PM - Isabella to smoking room, James to terrace\n10:20 PM - Edmund serves James brandy on terrace\n10:25 PM - Victor requests champagne be brought to gallery\n10:30 PM - Edmund delivers champagne bottle to gallery\n10:35 PM - Victor enters gallery (security log)\n10:42 PM - Sophia enters gallery (security log)\n10:46 PM - Sophia exits gallery (security log)\n10:47 PM - Margaret sends mysterious text\n10:49 PM - Security cameras disabled\n10:51 PM - [Gap in records]\n11:35 PM - Security cameras reactivated\n11:47 PM - Edmund discovers body",
      linkedTo: ["suspect_1", "suspect_2", "suspect_3", "suspect_4", "suspect_5"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_19",
      title: "Edmund's Financial Records",
      category: "document",
      description: "Bank statements and debt notices",
      content: "Edmund's personal finances reveal: $47,000 in gambling debts accumulated over 2 years, multiple threatening letters from creditors, and a notice of pension fund accessed early (depleted). Recent deposits of $8,000 per month for the last 6 months labeled 'wine sales' - this matches the value of bottles stolen from Victor's cellar. Final deposit was October 10th. After Victor discovered the theft, no more deposits. Edmund was desperate. A handwritten note found in his quarters: 'They'll break my legs if I don't pay by November 1st. What have I done?'",
      linkedTo: ["suspect_3", "evidence_6"],
      importance: "high",
      redHerring: false
    },
    {
      id: "evidence_20",
      title: "Forensic Analysis of Glasses",
      category: "forensic",
      description: "Laboratory report on all glasses from the evening",
      content: "Complete toxicology of all drinking vessels:\n- Victor's champagne glass: Lethal dose of potassium cyanide\n- All other glasses: Clean\n- Champagne bottle from gallery: Traces of cyanide on bottle rim only, not in the wine itself\n\nConclusion: Poison was applied to Victor's glass directly, or applied to the bottle rim in a way that would only contaminate the first glass poured. Given the bottle was delivered sealed, the most likely scenario is the glass itself was poisoned before the champagne was poured, or poison was added immediately after pouring. Timeframe: Between 10:30 PM (bottle delivered) and 11:15 PM (estimated time of death based on body temperature and rigor mortis).",
      linkedTo: ["evidence_1", "evidence_7"],
      importance: "high",
      redHerring: false
    }
  ],

  solution: {
    killer: "Edmund Price",
    motive: "Self-preservation - Victor was going to press charges for the wine theft, which would result in prison time and loss of pension. Edmund, at 67 with gambling debts and violent creditors, saw no other way out.",
    method: "Edmund took cyanide from the old photography darkroom. When Victor requested champagne be brought to the gallery at 10:25 PM, Edmund saw his opportunity. He delivered the bottle at 10:30 PM, but applied cyanide to the inside rim of Victor's champagne glass beforehand. When Victor poured his drink, the poison mixed with the champagne. Edmund then disabled the security cameras at 10:49 PM to create confusion and cover his tracks, making it seem like someone entered during the blackout.",
    explanation: "The evidence points to Edmund through multiple factors:\n\n1. MOTIVE: Edmund's journal (evidence_6) clearly shows his desperation and contemplation of murder. His financial records (evidence_19) reveal crushing debt and threats. Victor's discovery of the wine theft meant prison for Edmund.\n\n2. MEANS: Edmund had access to cyanide in the darkroom (evidence_14), which shows recent disturbance. He has keys to every room in the estate.\n\n3. OPPORTUNITY: Edmund delivered the champagne to the gallery at 10:30 PM (evidence_7). He was alone with the bottle and glasses. He could have poisoned the glass before Victor poured.\n\n4. TECHNICAL KNOWLEDGE: As butler, Edmund knew the estate intimately. He disabled the security cameras (evidence_13) - fiber evidence places him at the breaker box. This was a deliberate misdirection to make it seem like someone else used the camera blackout to commit murder.\n\n5. TIMELINE: Edmund's timeline in evidence_18 shows he had the perfect window. He delivered champagne, poisoned the glass, then later disabled cameras to create confusion about who might have entered.\n\n6. RED HERRINGS: The other suspects had motives and suspicious behavior, but lack the complete combination of means, motive, and opportunity:\n   - Margaret was planning something but couldn't go through with it (evidence_4)\n   - Sophia visited her father but left before he died (evidence_3)\n   - Isabella brought poisoned wine but it was the wrong poison (evidence_9)\n   - James had motive and cyanide but was visible on the terrace and his absence isn't confirmed\n\n7. JOURNAL ENTRY: Edmund's last entry on October 15th shows he planned to kill Victor but the crossed-out line suggests hesitation. However, when the moment came and Victor requested champagne in the isolated gallery, Edmund acted on his earlier plan.\n\nThe tragedy is that Edmund had served faithfully for 30 years, but desperation and fear of prison drove him to murder the man whose family he'd served since youth."
  },

  hints: [
    "Pay close attention to who had access to the champagne glass before Victor drank from it. The poison wasn't in the bottle.",
    "The security camera blackout was a red herring - check the security logs for what happened BEFORE the cameras went down.",
    "Look for evidence of who had keys to restricted areas of the estate, particularly the old darkroom where dangerous chemicals are stored."
  ]
};
